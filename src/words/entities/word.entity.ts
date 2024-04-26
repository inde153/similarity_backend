import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { DailyWord } from './daily-word.entity';

export enum WordType {
  Noun = 'Noun',
  Verb = 'Verb',
  Adjective = 'Adjective',
}

@Entity()
export class Word extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ type: 'enum', enum: WordType })
  @IsEnum(WordType)
  type: WordType;

  @Column({ type: 'json' })
  @IsEmail()
  embedding: any;

  @OneToMany(() => DailyWord, (dailyWord) => dailyWord.word)
  dailyWord: DailyWord;
}
