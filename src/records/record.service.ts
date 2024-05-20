import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerException } from 'src/common/exception/service.exception';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { Word } from 'src/entities/word.entity';
import { WordService } from 'src/words/word.service';
import { Repository } from 'typeorm';
import { WordInputDTO } from './dtos/get-guess.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    private readonly wordService: WordService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  async getEmbedding(wordInputDTO: WordInputDTO) {
    try {
      let word = await this.wordRepository.findOne({
        where: { name: wordInputDTO.name },
      });

      if (!word) {
        word = await this.embeddingService.getWordEmbedding(wordInputDTO.name);
      }

      const [dailyWord] = await this.wordService.getDailyWord();

      const similarity = Number(
        (
          this.cosineSimilarity(word.embedding, dailyWord.word.embedding) * 100
        ).toFixed(2),
      );

      return { similarity };
    } catch (e) {
      throw InternalServerException('Internal Server Error');
    }
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
