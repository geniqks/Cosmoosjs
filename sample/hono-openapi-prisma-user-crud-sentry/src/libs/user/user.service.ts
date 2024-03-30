import Bun from 'bun';
import type { LoginResponse, UserLoginInput, UserWithoutPassword } from './user.type';
import type { Prisma, User } from '@prisma/client';
import { ConfigService } from '@cosmoosjs/core';
import { HTTPException } from 'hono/http-exception';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserRepository } from './user.repository';
import { exclude } from '../helpers/exclude.helper';
import { inject, injectable } from 'inversify';
import { sign } from 'hono/jwt';

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  public async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findById(id: number): Promise<User | null> {
    return this.userRepository.findUniqueById(id);
  }

  public async createUser(user: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    const saltRound = this.configService.get<number>('SALT_ROUND');
    const password = user.password ?? '';
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: 'bcrypt',
      cost: saltRound,
    });
    user.password = hashedPassword;
    const createdUser = await this.userRepository.create(user);
    const userWithoutPassword = exclude(createdUser, ['password']);
    return userWithoutPassword;
  }

  public async delete(siteId: number): Promise<User | null> {
    return this.userRepository.deleteOne(siteId);
  }

  public async update(id: number, user: Prisma.UserUncheckedUpdateInput): Promise<User | null> {
    return this.userRepository.update(id, user);
  }

  public async login(user: UserLoginInput): Promise<LoginResponse> {
    const userFound = await this.userRepository.findUniqueByEmail(user.email);
    if (userFound) {
      const userPassword = userFound.password ?? '';
      const password = user.password ?? '';
      const isMatch = await Bun.password.verify(password, userPassword);
      if (isMatch) {
        const userWithoutPassword = exclude(userFound, ['password']);
        const jwtSecret = this.configService.get<string>('JWT_TOKEN');
        const token = await sign(userWithoutPassword, jwtSecret);
        return {
          ...userWithoutPassword,
          token,
        };
      } else {
        // For security reason we will never tell if the user exist or not
        throw new HTTPException(StatusCodes.NOT_FOUND, {
          message: `User '${user.email}' ${ReasonPhrases.NOT_FOUND}`,
        });
      }
    } else {
      throw new HTTPException(StatusCodes.NOT_FOUND, {
        message: `User '${user.email}' ${ReasonPhrases.NOT_FOUND}`,
      });
    }
  }
}
