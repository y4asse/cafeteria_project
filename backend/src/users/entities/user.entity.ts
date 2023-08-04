import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, comment: 'メールアドレス' })
  email: string;

  @Column({ comment: 'パスワード' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn({ comment: '登録日時' })
  readonly created_at?: Timestamp;

  @UpdateDateColumn({ comment: '更新日時' })
  readonly updated_at?: Timestamp;
}
