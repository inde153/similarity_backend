import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Record } from './record.entity';

export enum UserLoginType {
  Guest = 'Guest',
  Google = 'Google',
  Email = 'Email',
}

@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({})
  @IsString()
  loginType: UserLoginType;

  @Column({ default: 0 })
  @IsNumber()
  score: number;

  @OneToMany(() => Record, (record) => record.user)
  record: Record[];
}
