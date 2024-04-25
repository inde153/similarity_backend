import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';
import { IsEmail, IsEnum, IsString } from 'class-validator';

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
}
