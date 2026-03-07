import { Expose } from 'class-transformer';

export class UserResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  updatedAt: Date;

  @Expose()
  createdAt: Date;
}
