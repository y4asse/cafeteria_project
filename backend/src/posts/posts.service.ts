import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Posts> {
    const { title, description, university, image, uid } = createPostDto;
    const post = this.postRepository.create({
      title: title, // タイトルを設定
      description: description, // 引数のcontentをdescriptionフィールドに設定
      picture: image, // 画像のURLを設定
      uid: uid, // ユーザーIDを設定
      university: university, // 所属id
      isActive: true, // isActiveフィールドをtrueに設定
      update_at: new Date(), // 現在の日時を設定
    });
    // saveでデータベースに保存される
    await this.postRepository.save(post);
    return post;
  }

  //検索よう
  async searchPosts(title: string, university: string): Promise<Posts[]> {
    const query = this.postRepository.createQueryBuilder('post');
    if (title) {
      query.andWhere('post.title LIKE :title', { title: `%${title}%` });
    }
    if (university) {
      query.andWhere('post.university LIKE :university', { university: `%${university}%` });
    }
    return await query.getMany();
  }

  //今日の1日よう
  async searchLunch(university: string): Promise<Posts | null> {
    const query = this.postRepository.createQueryBuilder('post');
    query.where('post.university = :university', { university }); 
    query.orderBy('RAND()'); // ランダムに並び替える
    query.take(1); // 最初の1行を取得する
    const randomPost = await query.getOne();
    return randomPost || null;
  }

  async findAll(): Promise<Posts[]> {
    return this.postRepository.find();
  }

  async findOne(id): Promise<Posts> {
    return this.postRepository.findOne({ where: { id: id } });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }
}
