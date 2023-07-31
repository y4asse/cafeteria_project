import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Posts } from './posts/entities/post.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'user',
  password: 'password',
  database: 'develop',
  synchronize: true,
  entities: [User, Posts], 
});
