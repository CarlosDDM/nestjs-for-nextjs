import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { createSlugFromText } from 'src/common/utils/create-slug-from-title.utils';
import { generateRandomSuffix } from 'src/common/utils/generate-random-suffix.utils';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name, { timestamp: true });
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  create(id: string, createPostDto: CreatePostDto) {
    const slug = `${createSlugFromText(createPostDto.title)}${generateRandomSuffix()}`;
    return this.postRepository
      .save({ ...createPostDto, authorId: id, slug })
      .catch((err: unknown) => {
        if (err instanceof Error) {
          this.logger.error('Erro ao criar post: ', err.stack);
        }

        throw new BadRequestException('Erro ao criar o post');
      });
  }

  findAll() {
    return this.postRepository.find({ relations: ['author'] });
  }

  findOne(partialPost: Partial<Post>) {
    return this.postRepository
      .findOneOrFail({
        where: partialPost,
        relations: ['author'],
      })
      .catch((err: unknown) => {
        this.logger.error(`Post não encontrado`, err);
        throw new NotFoundException('Post não encontrado');
      });
  }

  findOneOwned(id: string, authorId: string) {
    return this.postRepository
      .findOneOrFail({
        where: { id, authorId },
        relations: ['author'],
      })
      .catch((err: unknown) => {
        this.logger.error(
          `Post não encontrado ou usuário não coincide: id:${id}`,
          err,
        );
        throw new NotFoundException('Post não encontrado');
      });
  }

  findAllOwned(authorId: string) {
    return this.postRepository.find({
      where: { authorId },
      relations: ['author'],
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
