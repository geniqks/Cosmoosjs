import type { Prisma, User } from '@prisma/client';

export type UserLoginInput = Prisma.UserGetPayload<{
  select: {
    email: any;
    password: any;
  };
}>;

export type UserWithoutPassword = Omit<User, 'password'>;
export type LoginResponse = UserWithoutPassword & { token: string }