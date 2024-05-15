import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenaiService } from 'src/openai/openai.service';
import { Word } from 'src/words/entities/word.entity';
import { Repository } from 'typeorm';
import { WordInputDTO } from './dtos/get-guess.dto';
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

  async getEmbedding(wordInputDTO: WordInputDTO) {
    let { id, embedding } = await this.wordRepository.findOne({
      where: { name: wordInputDTO.name },
    });

    // 특정 유저의 count를 1 증가시킵니다.
    // await this.gueesRepository
    // .createQueryBuilder()
    // .update(Geees)
    // .set({ count: () => "count + 1" })
    // .where("userId = :userId", { userId })
    // .execute();

    if (!embedding) {
      embedding = await this.openaiService.getEmbedding(id, wordInputDTO.name);
    }

    const { embedding: dailyWord } = await this.wordRepository.findOne({
      where: { id: 10 },
    });

    const similarity = Number(
      (this.cosineSimilarity(embedding, dailyWord) * 100).toFixed(2),
    );

    return { similarity };
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
