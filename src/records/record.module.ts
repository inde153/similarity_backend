import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guees } from './entities/guees.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guees])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
