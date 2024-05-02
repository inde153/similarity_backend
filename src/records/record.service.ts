import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenaiService } from 'src/openai/openai.service';
import { Word } from 'src/words/entities/word.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    private readonly openaiService: OpenaiService,
  ) {}
  async getEmbedding(word) {
    const res = await this.wordRepository.findOne({
      where: { name: word },
    });
    if (!res) {
      // const res = await this.openaiService.getEmbedding(word);
    }
  }
}
