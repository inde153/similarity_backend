import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { OpenaiModuleOptions } from './interfaces';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: OpenaiModuleOptions,
  ) {
    this.openai = new OpenAI({
      apiKey: this.options.apiKey,
    });
  }

  async getEmbedding(word: string) {
    return this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: `${word}`,
      encoding_format: 'float',
    });
  }
}
