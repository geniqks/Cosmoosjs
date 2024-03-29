import type { Prisma, User } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../prisma/prisma.service';

@injectable()
export class UserRepository {
  public constructor(@inject(PrismaService) public readonly prisma: PrismaService) {}

  public async create(user: Prisma.UserCreateInput): Promise<User> {
      const userCreated = await this.prisma.client.user.create({
        data: {
          email: user.email,
          name: user.name,
        },
      });

      return userCreated;
  }

  public async findUniqueById(id: number): Promise<User | null> {
    return this.prisma.client.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async find(): Promise<User[]> {
    return this.prisma.client.user.findMany({});
  }

  public async deleteOne(id: number): Promise<User | null> {
    return this.prisma.client.user.delete({
      where: {
        id,
      },
    });
  }

  public async update(id: number, user: Prisma.UserUncheckedUpdateInput): Promise<User | null>{
    return this.prisma.client.user.update({
      where: {
        id
      },
      data: user
    })
  }
}
