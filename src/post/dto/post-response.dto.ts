import { Expose, Type } from 'class-transformer';

class AuthorResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}

export class PostResponse {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  content: string;

  @Expose()
  excerpt: string;

  @Expose()
  coverImageUrl: string;

  @Expose()
  published: boolean;

  @Expose()
  updatedAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => AuthorResponse)
  author: AuthorResponse;
}
