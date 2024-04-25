import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';

@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  loginType: string;
}
