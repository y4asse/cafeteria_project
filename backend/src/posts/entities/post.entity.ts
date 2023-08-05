import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  picture: string;

  @Column()
  uid: string;

  @Column()
  university: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  update_at: Date;
}
