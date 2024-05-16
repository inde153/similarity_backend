import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { IsNumber } from 'class-validator';
import { Word } from './word.entity';
import { Record } from './record.entity';

@Entity()
export class DailyWord extends CoreEntity {
  @Column()
  @IsNumber()
  wordId: number;

  @OneToMany(() => Record, (record) => record.user)
  record: Record[];

  @ManyToOne(() => Word, (word) => word.id, {
    eager: true,
  })
  word: Word;
}
