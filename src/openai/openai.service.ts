import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from 'openai';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { Word } from 'src/words/entities/word.entity';
import { Repository } from 'typeorm';
import { OpenaiModuleOptions } from './interfaces';
import * as pgvector from 'pgvector/pg';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    @Inject(CONFIG_OPTIONS) private readonly options: OpenaiModuleOptions,
  ) {
    this.openai = new OpenAI({
      apiKey: this.options.apiKey,
    });
  }

  async getEmbedding(id: number, word: string): Promise<any> {
    const embedding = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: `${word}`,
      encoding_format: 'float',
    });

    await this.wordRepository.update(id, {
      embedding: pgvector.toSql(embedding.data[0].embedding),
    });
  }
}
