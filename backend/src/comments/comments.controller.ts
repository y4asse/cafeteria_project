import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comments } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('create')
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @Get(':pid')
  findAllByPid(@Param('pid') pid: string): Promise<Comments[]> {
    return this.commentsService.findAllByPid(pid);
  }
}
