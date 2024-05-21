import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from 'src/common/interfaces';
import { Record } from 'src/entities/record.entity';
import { User } from 'src/entities/user.entity';
import { WordService } from 'src/words/word.service';
import { Repository } from 'typeorm';
import { WordInputDTO } from './dtos/get-guess.dto';

@Injectable()
export class RecordService {
  constructor(
    private readonly wordService: WordService,
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async getEmbedding(authUser: User, wordInputDTO: WordInputDTO) {
    let word = await this.wordService.getWord(wordInputDTO.name);
    let isSolve = false;

    const [dailyWord] = await this.wordService.getDailyWord();

    const similarity = Number(
      (
        this.cosineSimilarity(word.embedding, dailyWord.word.embedding) * 100
      ).toFixed(2),
    );

    if (~~similarity === 100) {
      isSolve = true;
    }

    if (authUser?.id) {
      const record = await this.recordRepository.findOne({
        where: { user: { id: authUser.id }, dailyWord: { id: dailyWord.id } },
        relations: ['user', 'dailyWord'],
      });

      if (!record) {
        await this.recordRepository.save({
          user: authUser,
          dailyWord,
          isSolve,
          tryCount: 1,
        });
      }
      if (!record?.isSolve) {
        await this.recordRepository.update(record.id, {
          tryCount: record.tryCount + 1,
          isSolve,
        });
      }
    }

    return { similarity, isSolve };
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
