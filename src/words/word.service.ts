import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyWord } from './entities/daily-word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(DailyWord)
    private readonly dailyWord: Repository<DailyWord>,
  ) {}

  async getDailyWord() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.dailyWord.findOne({
      where: { id: 1 },
    });
  }
}
