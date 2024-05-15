import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { DailyWord } from 'src/entities/daily-word.entity';
import { Word } from 'src/entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyWord, Word, Category])],
  controllers: [WordController],
  providers: [WordService],
})
export class WordsModule {}
