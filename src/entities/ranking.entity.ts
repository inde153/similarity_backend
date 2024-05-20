import { CoreEntity } from 'src/common/entities/core.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { User } from './user.entity';
import { DailyWord } from './daily-word.entity';

@Entity()
export class Ranking extends CoreEntity {
  @Column()
  @IsNumber()
  ranking: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
