import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Repository } from 'typeorm';
import { Comments } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments) private commentRepository: Repository<Comments>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comments> {
    const { pid, uid, content } = createCommentDto;
    const comment = this.commentRepository.create({
      pid,
      uid,
      content,
    });
    await this.commentRepository.save(comment);
    return comment;
  }

  async findAllByPid(pid: string): Promise<Comments[]> {
    return this.commentRepository.find({ where: { pid: pid } });
  }
}
