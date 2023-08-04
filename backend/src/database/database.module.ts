import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: 'user',
        password: 'password',
        database: 'develop',
        //エンティティの変更を自動的に Database に反映してくれます。
        //本番環境では意図せずデータが削除されてしまうこともあるので、明示的にマイグレーションするのが望ましいです。
        synchronize: true,
        entities: [User, Posts],
      }),
    }),
  ],
})
export class DatabaseModule {}
