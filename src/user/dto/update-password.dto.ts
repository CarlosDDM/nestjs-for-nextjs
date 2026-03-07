import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'A senha tem que ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode estar vazio' })
  currentPassword: string;

  @IsString({ message: 'A nova senha tem que ser uma string' })
  @IsNotEmpty({ message: 'A nova senha não pode estar vazio' })
  @MinLength(6, { message: 'A nova senha tem que ter mais de 6 caracteres' })
  newPassword: string;
}
