import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guees } from './entities/guees.entity';
import { ScoreInfo } from './entities/score-info.entity';
import { Word } from 'src/words/entities/word.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guees, ScoreInfo, Word])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
