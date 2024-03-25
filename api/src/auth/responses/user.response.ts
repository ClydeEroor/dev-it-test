import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  id: string;
  email: string;

  roles: Role[];

  @Exclude()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  isBlocked: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.roles = user.roles;
    this.createdAt = user.createdAt;
  }
}
