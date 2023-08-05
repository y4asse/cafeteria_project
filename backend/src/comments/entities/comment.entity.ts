import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: '投稿id' })
  pid: string;

  @Column({ comment: 'ユーザーid' })
  uid: string;

  @Column({ comment: '内容' })
  content: string;

  @CreateDateColumn({ comment: '登録日時' })
  readonly created_at?: Timestamp;

  @UpdateDateColumn({ comment: '更新日時' })
  readonly updated_at?: Timestamp;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'uid' })
  user: User;
}
