import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { StorageService } from 'src/storage/storage.service';

@Module({
  controllers: [FileController],
  providers: [FileService, StorageService],
})
export class FileModule {}
