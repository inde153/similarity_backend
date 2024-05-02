import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyWord } from './entities/daily-word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(DailyWord)
    private readonly dailyWordRepository: Repository<DailyWord>,
  ) {}

  async getDailyWord() {
    return this.dailyWordRepository.findOne({
      where: { id: 1 },
    });
  }
}
