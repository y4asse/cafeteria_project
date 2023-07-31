import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  picture: string;

  @Column()
  uid: number;

  @Column()
  did: number;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  update_at: Date;
}
