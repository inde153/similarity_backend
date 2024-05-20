import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyWord } from 'src/entities/daily-word.entity';
import { Word } from 'src/entities/word.entity';
import { EmbeddingService } from 'src/embedding/embedding.service';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(DailyWord)
    private readonly dailyWordRepository: Repository<DailyWord>,
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    private readonly embeddingService: EmbeddingService,
  ) {}

  async getDailyWord(): Promise<DailyWord[]> {
    return this.dailyWordRepository.find({ order: { id: 'DESC' } });
  }

  async getWord(name: string): Promise<Word> {
    let word = await this.wordRepository.findOne({
      where: { name },
    });

    if (!word) {
      word = await this.embeddingService.getWordEmbedding(name);
    }

    return word;
  }
}
