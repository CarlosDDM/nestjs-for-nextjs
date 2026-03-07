import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserCredentialHistory } from './entities/user-credential-history.entity';
import { PasswordHistoryType } from './enums/password-history.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserCredentialHistory)
    private readonly passwordResetedHistory: Repository<UserCredentialHistory>,
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
  ) {}

  async failIfEmailExists(email: string) {
    const existUser = await this.userRepository.existsBy({
      email,
    });

    if (existUser) throw new ConflictException('E-mail já existe');
  }

  async findByOrFail(userData: Partial<User>) {
    const user = await this.userRepository.findOneByOrFail(userData);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    await this.failIfEmailExists(createUserDto.email);
    const newUser = {
      ...createUserDto,
      hashedPassword: await this.hashingService.hash(createUserDto.password),
    };

    try {
      const created = await this.userRepository.save(newUser);
      return created;
    } catch (err) {
      console.log(
        `Não foi possivel slavar o usuário na base de dados, Error: ${err}`,
      );
      throw new BadRequestException();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findById(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  private validateUpdateUser(updateUserDto: UpdateUserDto) {
    if (!updateUserDto.name && !updateUserDto.email)
      throw new BadRequestException('Dados não enviados');
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let isEmailChanged = false;
    this.validateUpdateUser(updateUserDto);

    const user = await this.findByOrFail({ id });

    user.name = updateUserDto.name ?? user.name;

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.failIfEmailExists(updateUserDto.email);
      user.email = updateUserDto.email;
      isEmailChanged = true;
    }

    return this.dataSource.transaction(async manager => {
      await manager.save(User, {
        id,
        name: user.name,
        email: user.email,
      });

      if (isEmailChanged) {
        await manager.save(UserCredentialHistory, {
          userId: user.id,
          type: PasswordHistoryType.EMAIL,
        });
      }
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  save(user: User) {
    return this.userRepository.save(user);
  }

  lastChangedPassword(id: string) {
    return this.passwordResetedHistory.findOne({
      where: {
        userId: id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  private async validateCurrentPassword(
    currentPassword: string,
    hashedPassword: string,
  ) {
    const isValid = await this.hashingService.compare(
      currentPassword,
      hashedPassword,
    );

    if (!isValid) throw new UnauthorizedException('Senha atual inválida');
  }

  private async validateNewPassword(
    newPassword: string,
    hashedPassword: string,
  ) {
    const isSame = await this.hashingService.compare(
      newPassword,
      hashedPassword,
    );

    if (isSame)
      throw new UnprocessableEntityException(
        'A nova senha não pode ser igual à senha anterior',
      );
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { currentPassword, newPassword } = updatePasswordDto;

    const user = await this.findByOrFail({ id });

    const { hashedPassword } = user;

    await this.validateCurrentPassword(currentPassword, hashedPassword);

    await this.validateNewPassword(newPassword, hashedPassword);

    const newHashedPassword = await this.hashingService.hash(newPassword);

    await this.dataSource.transaction(async manager => {
      await manager.update(User, id, {
        hashedPassword: newHashedPassword,
      });

      await manager.save(UserCredentialHistory, {
        userId: id,
        type: PasswordHistoryType.PASSWORD,
      });
    });
  }
}
