import { inject, injectable } from 'inversify';
import { UserRepository } from './user.repository';
import type { Prisma, User } from '@prisma/client';

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private readonly userRepository: UserRepository) {}

  public async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findById(id: number): Promise<User | null> {
    return this.userRepository.findUniqueById(id);
  }

  public async createUser(user: Prisma.UserCreateInput): Promise<User> {
    return this.userRepository.create(user);
  }

  public async delete(siteId: number): Promise<User | null> {
    return this.userRepository.deleteOne(siteId);
  }

  public async update(id: number, user: Prisma.UserUncheckedUpdateInput): Promise<User | null>{
    return this.userRepository.update(id, user);
  }
}
