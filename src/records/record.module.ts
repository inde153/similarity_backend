import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../entities/record.entity';
import { ScoreInfo } from 'src/entities/score-info.entity';
import { Word } from 'src/entities/word.entity';
import { DailyWord } from 'src/entities/daily-word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, ScoreInfo, Word, DailyWord])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordsModule {}
