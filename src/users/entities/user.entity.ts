import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { Guees } from 'src/records/entities/guees.entity';

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
  loginType: string;

  @OneToMany(() => Guees, (guees) => guees.user)
  guees: Guees;
}
