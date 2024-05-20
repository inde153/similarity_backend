import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../entities/record.entity';
import { ScoreInfo } from 'src/entities/score-info.entity';
import { Word } from 'src/entities/word.entity';
import { EmbeddingService } from 'src/embedding/embedding.service';
import { WordsModule } from 'src/words/word.module';

@Module({
  imports: [TypeOrmModule.forFeature([Record, ScoreInfo, Word]), WordsModule],
  controllers: [RecordController],
  providers: [RecordService, EmbeddingService],
})
export class RecordsModule {}
