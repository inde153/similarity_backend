import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@Entity()
export class ScoreInfo extends CoreEntity {
  @Column({ unique: true })
  @IsNumber()
  tryCount: number;

  @Column()
  @IsNumber()
  score: number;
}
