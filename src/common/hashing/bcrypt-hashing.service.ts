import bcrypt from 'bcryptjs';
import { HashingService } from './hashing.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHashingService extends HashingService {
  constructor(private readonly configService: ConfigService) {
    super();
  }
  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hash);

    return isValid;
  }

  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(Number(this.configService.get('SALT')));
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }
}
