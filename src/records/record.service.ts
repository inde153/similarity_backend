import { HttpException, Injectable } from '@nestjs/common';
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
  async getEmbedding(word: string) {
    const data = await this.wordRepository.findOne({
      where: { name: word },
    });

    if (!data) {
      return '';
    }

    if (!data.embedding) {
      const embedding = await this.openaiService.getEmbedding(word);
      await this.wordRepository.update(data.id, {
        embedding: embedding.data[0].embedding,
      });
    }
  }
}
