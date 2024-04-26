import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Word } from './word.entity';

@Entity()
export class Category extends CoreEntity {
  @Column({ unique: true })
  @IsString()
  name: string;

  @OneToMany(() => Word, (word) => word.category)
  word: Word;
}
