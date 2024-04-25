import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';

@Entity()
export class DailyWord extends CoreEntity {
  @Column()
  @IsString()
  wordId: number;
}
