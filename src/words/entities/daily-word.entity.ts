import { CoreEntity } from 'src/common/entities/core.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { IsNumber } from 'class-validator';
import { Guees } from 'src/records/entities/guees.entity';
import { Word } from './word.entity';

@Entity()
export class DailyWord extends CoreEntity {
  @Column()
  @IsNumber()
  wordId: number;

  @OneToMany(() => Guees, (guees) => guees.user)
  guees: Guees;

  @ManyToOne(() => Word, (word) => word.id, {
    eager: true,
  })
  word: Word;
}
