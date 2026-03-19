import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Título precisa ser uma string' })
  @Length(10, 150, { message: 'Título precisa ter entre 10 a 150 caracterres' })
  title: string;

  @IsString({ message: 'Excerto precisa ser uma string' })
  @Length(10, 200, {
    message: 'Excerto precisa ter entre 10 a 200 caracterres',
  })
  excerpt: string;

  @IsString({ message: 'O conteúdo precisa ser uma string' })
  @IsNotEmpty({ message: 'Conteúdo não pode ficar vazio' })
  content: string;

  //TODO mudar o require_tld para true
  @IsOptional()
  @IsUrl(
    { require_tld: false },
    { message: 'A url da imagem precisa ser uma url válida' },
  )
  coverImageUrl?: string;
}
