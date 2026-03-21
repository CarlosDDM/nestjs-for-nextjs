import { Injectable } from '@nestjs/common';
import { generateImageFilename } from 'src/common/utils/generate-image-filename.utils';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class FileService {
  constructor(private readonly storageService: StorageService) {}
  async upload(file: Express.Multer.File) {
    const key = generateImageFilename(file.originalname);
    const url = await this.storageService.uploadImage(file, key);
    return { url };
  }
}
