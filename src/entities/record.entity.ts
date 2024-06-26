import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';
import { User } from './user.entity';
import { DailyWord } from './daily-word.entity';

@Entity()
@Unique(['user', 'dailyWord'])
export class Record extends CoreEntity {
  @Column()
  @IsNumber()
  tryCount: number;

  @Column()
  @IsBoolean()
  isSolve: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => DailyWord, (dailyWord) => dailyWord.id)
  @JoinColumn({ name: 'dailyWordId' })
  dailyWord: DailyWord;
}
