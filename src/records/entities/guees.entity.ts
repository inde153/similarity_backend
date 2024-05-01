import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { DailyWord } from 'src/words/entities/daily-word.entity';

@Entity()
export class Guees extends CoreEntity {
  @Column()
  @IsNumber()
  tryCount: number;

  @Column()
  @IsBoolean()
  isSolve: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => DailyWord, (dailyWord) => dailyWord.id)
  dailyWord: DailyWord;
}