import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'O nome precisa ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @IsNotEmpty({ message: 'O E-mail não pode ser vazio' })
  email: string;

  @IsString({ message: 'A senha tem que ser uma string' })
  @IsNotEmpty({ message: 'A senha não pode estar vazio' })
  @MinLength(6, { message: 'A senha tem que ter mais de 6 caracteres' })
  password: string;
}
