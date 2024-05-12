import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Guees } from 'src/records/entities/guees.entity';

export enum UserLoginType {
  Guest = 'Guest',
  Google = 'Google',
  Kakao = 'Kakao',
}

@Entity()
export class User extends CoreEntity {
  @Column()
  @IsString()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: 'GUEST' })
  @IsString()
  loginType: UserLoginType;

  @Column({ default: 0 })
  @IsNumber()
  score: number;

  @OneToMany(() => Guees, (guees) => guees.user)
  guees: Guees[];
}
