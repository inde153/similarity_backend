import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { IsEmail, IsEnum, IsJSON, IsString } from 'class-validator';
import { DailyWord } from './daily-word.entity';
import { Category } from './category.entity';

@Entity()
export class Word extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  name: string;

  @Column({ type: 'json', nullable: true })
  @IsJSON()
  embedding: any;

  @OneToMany(() => DailyWord, (dailyWord) => dailyWord.word)
  dailyWord: DailyWord;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;
}
