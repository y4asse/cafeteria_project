import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Post('search')
  async searchPosts(@Body() searchData: { title: string; university: string }) {
    try {
      const { title, university } = searchData;
      const searchResult = await this.postsService.searchPosts(
        title,
        university,
      );
      return searchResult;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while searching posts.');
    }
  }

  @Post('today')
  async searchLunch(@Body() searchData: { university: string }) {
    try {
      const { university } = searchData;
      const searchResult = await this.postsService.searchLunch(university);
      return searchResult;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while searching posts.');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
