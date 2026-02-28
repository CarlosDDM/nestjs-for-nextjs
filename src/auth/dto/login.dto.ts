import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({ require_tld: true }, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'Senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Senha não não pode estar vazia' })
  password: string;
}
