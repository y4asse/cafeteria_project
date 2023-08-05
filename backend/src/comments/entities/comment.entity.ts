import {
  Column,
  CreateDateColumn,
  Entity,
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
}
