import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../entities/record.entity';
import { ScoreInfo } from 'src/entities/score-info.entity';
import { WordsModule } from 'src/words/word.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record, ScoreInfo]), WordsModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordsModule {}
