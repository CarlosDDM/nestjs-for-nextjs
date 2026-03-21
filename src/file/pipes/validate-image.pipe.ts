import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ValidateImagePipe implements PipeTransform {
  constructor(private readonly configService: ConfigService) {}

  private readonly allowedMimeType = ['image/jpeg', 'image/png', 'image/webp'];

  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const maxSize = Number(this.configService.getOrThrow('IMAGE_SIZE'));

    if (value.size > maxSize) {
      throw new BadRequestException('Arquivo muito grande');
    }

    if (!this.allowedMimeType.includes(value.mimetype)) {
      throw new BadRequestException('Somente imagens são permitidas');
    }

    return value;
  }
}
