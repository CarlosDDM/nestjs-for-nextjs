import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostResponse } from './dto/post-response.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/types/authenticated-request.type';

@Controller('post')
@SerializeOptions({ type: PostResponse })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: AuthenticatedRequest,
    @Body() createPostDto: CreatePostDto,
  ) {
    const { id } = req.user;
    return this.postService.create(id, createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findAllOwned(@Req() req: AuthenticatedRequest) {
    const { id: authorId } = req.user;
    return this.postService.findAllOwned(authorId);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.postService.findOne({ slug });
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/:id')
  findOneOwned(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const { id: authorId } = req.user;
    return this.postService.findOneOwned(id, authorId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/:id')
  update(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const { id: authorId } = req.user;
    return this.postService.update(id, authorId, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/:id')
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const { id: authorId } = req.user;
    return this.postService.remove(id, authorId);
  }
}
