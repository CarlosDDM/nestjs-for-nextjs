import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;
  private readonly bucket: string;
  private readonly region: string;
  private readonly isPathStyle: boolean;
  private readonly s3WebUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.getOrThrow<string>('S3_REGION');
    this.bucket = this.configService.getOrThrow<string>('S3_BUCKET');
    this.isPathStyle =
      this.configService.getOrThrow<string>('S3_PATH_STYLE') === 'true';
    this.s3WebUrl = this.configService.getOrThrow<string>('S3_WEB_URL');
    this.s3Client = new S3Client({
      region: this.region,
      endpoint: this.configService.getOrThrow<string>('S3_API_URL'),
      forcePathStyle: this.isPathStyle,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('S3_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>('S3_SECRET_KEY'),
      },
    });
  }

  async uploadImage(file: Express.Multer.File, key: string) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    if (!this.isPathStyle) {
      return `${this.s3WebUrl}/${key}`;
    }

    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }
}
