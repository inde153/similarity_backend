import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import OpenAI from 'openai';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { Repository } from 'typeorm';
import { OpenaiModuleOptions } from './interfaces';
import * as pgvector from 'pgvector/pg';
import { Word } from 'src/entities/word.entity';

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

  async getEmbedding(targetWord: string): Promise<Word> {
    const embedding = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: `${targetWord}`,
      encoding_format: 'float',
    });

    if (!embedding) {
      throw new HttpException({ message: '없는 단어' }, HttpStatus.BAD_REQUEST);
    }

    return this.wordRepository.save(
      this.wordRepository.create({
        name: targetWord,
        embedding: pgvector.toSql(embedding),
      }),
    );
  }
}
