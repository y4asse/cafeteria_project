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

  @Column({ comment: 'ユーザー名' })
  username: string;

  @Column({ nullable: true, comment: '大学名' })
  university: string;

  @Column({ nullable: true, comment: 'プロフィール画像URL' })
  profileImageUrl?: string;

  @CreateDateColumn({ comment: '登録日時' })
  readonly created_at?: Timestamp;

  @UpdateDateColumn({ comment: '更新日時' })
  readonly updated_at?: Timestamp;
}
