import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsNumber, IsString } from 'class-validator';

@Entity()
export class Record extends CoreEntity {
  @Column()
  @IsNumber()
  userId: number;

  @Column({ unique: true })
  @IsNumber()
  dailyWordId: number;

  @Column()
  @IsNumber()
  tryCount: number;
}
