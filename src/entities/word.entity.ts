import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany, ManyToOne, Unique } from 'typeorm';
import { IsString } from 'class-validator';
import { DailyWord } from './daily-word.entity';

@Entity()
export class Word extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  embedding: string;

  @OneToMany(() => DailyWord, (dailyWord) => dailyWord.word)
  dailyWord: DailyWord[];
}
