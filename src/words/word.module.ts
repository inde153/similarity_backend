import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyWord } from './entities/daily-word.entity';
import { Word } from './entities/word.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyWord, Word, Category])],
  controllers: [WordController],
  providers: [WordService],
})
export class WordsModule {}
