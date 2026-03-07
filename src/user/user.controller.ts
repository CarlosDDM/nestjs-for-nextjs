import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  SerializeOptions,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import type { AuthenticatedRequest } from 'src/types/authenticated-request.type';
import { UserResponse } from './dto/user-response.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
@SerializeOptions({ type: UserResponse })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    console.log(req.user);
    return `Resposta chegou ${id}`;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(
    @Req() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { id } = req.user;
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  updatePassword(
    @Req() req: AuthenticatedRequest,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { id } = req.user;
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
