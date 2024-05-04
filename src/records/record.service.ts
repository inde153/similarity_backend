import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenaiService } from 'src/openai/openai.service';
import { Word } from 'src/words/entities/word.entity';
import { Repository } from 'typeorm';
import { GetWordInput } from './dtos/get-guess.dto';
import * as pgvector from 'pgvector/pg';
import { DailyWord } from 'src/words/entities/daily-word.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    @InjectRepository(DailyWord)
    private readonly dailyWordRepository: Repository<DailyWord>,
    private readonly openaiService: OpenaiService,
  ) {}

  async getEmbedding(body: GetWordInput) {
    let { id, embedding } = await this.wordRepository.findOne({
      where: { name: body.name },
    });

    if (!embedding) {
      //openAI서비스로 빼기
      const embe = await this.openaiService.getEmbedding(body.name);
      embedding = pgvector.toSql(embe.data[0].embedding);
      await this.wordRepository.update(id, {
        embedding,
      });
    }

    const { embedding: dailyWord } = await this.wordRepository.findOne({
      where: { id: 10 },
    });

    const similarity = this.cosineSimilarity(embedding, dailyWord);

    // if() scoreInfo에 저장해야 함

    return {
      ok: true,
      error: '',
      data: { similarity },
    };
  }

  private cosineSimilarity(embedding: string, dailyWord: string): number {
    const vecA = embedding.slice(1, -1).split(',').map(Number);
    const vecB = dailyWord.slice(1, -1).split(',').map(Number);

    let dotProduct = 0.0;
    let normA = 0.0;
    let normB = 0.0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] ** 2;
      normB += vecB[i] ** 2;
    }

    if (normA === 0 || normB === 0) {
      return 0;
    } else {
      return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
  }
}
