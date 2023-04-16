import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ nullable: true })
  public phone: string;

  @Column()
  @Exclude()
  user_id?: number;
}
