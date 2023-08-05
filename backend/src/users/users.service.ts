import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('id:' + id);
    console.log('user:' + user.email);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません');
    }
    const { university, profileImageUrl, username } = user;
    return { university, profileImageUrl, username };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, university, profileImageUrl, username } =
      createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      university,
      profileImageUrl,
      username,
    });
    // saveでデータベースに保存される
    await this.userRepository.save(user);
    return user;
  }
}
