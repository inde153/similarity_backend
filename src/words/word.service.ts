import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyWord } from 'src/entities/daily-word.entity';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(DailyWord)
    private readonly dailyWordRepository: Repository<DailyWord>,
  ) {}

  async getDailyWord(): Promise<DailyWord[]> {
    return this.dailyWordRepository.find();
  }
}
