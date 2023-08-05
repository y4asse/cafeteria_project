import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/comments/entities/comment.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        //エンティティの変更を自動的に Database に反映してくれます。
        //本番環境では意図せずデータが削除されてしまうこともあるので、明示的にマイグレーションするのが望ましいです。
        synchronize: true,
        entities: [User, Posts, Comments],
      }),
    }),
  ],
})
export class DatabaseModule {}
