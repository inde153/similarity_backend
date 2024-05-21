import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { Word } from 'src/entities/word.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as pgvector from 'pgvector/pg';
import { OpenaiService } from 'src/openai/openai.service';

@Injectable()
export class EmbeddingService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
  ) {}

  async getWordEmbedding(targetWord: string): Promise<Word> {
    return new Promise((resolve, reject) => {
      let embedding = null;
      let dataBuffer = Buffer.alloc(0);

      const modelPath = process.env.MODEL_PATH;
      const stream = fs.createReadStream(join(modelPath), {
        highWaterMark: 2097152,
      });

      stream
        .on('data', (chunk: any) => {
          dataBuffer = Buffer.concat([dataBuffer, chunk]);

          const lines = dataBuffer.toString().split('\n');
          dataBuffer = Buffer.from(lines.pop(), 'utf-8');

          for (const line of lines) {
            if (line.startsWith(targetWord + ' ')) {
              const embeddingStr = line.slice(targetWord.length + 1).trim();
              embedding = embeddingStr.split(' ').map(parseFloat);
              stream.close();
              break;
            }
          }
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('close', async () => {
          if (embedding !== null) {
            resolve(
              await this.wordRepository.save(
                this.wordRepository.create({
                  name: targetWord,
                  embedding: pgvector.toSql(embedding),
                }),
              ),
            );
          }
        });
    });
  }
}
