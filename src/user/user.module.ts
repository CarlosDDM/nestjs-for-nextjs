import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommonModule } from 'src/common/common.module';
import { UserCredentialHistory } from './entities/user-credential-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserCredentialHistory]),
    CommonModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
