import { PrismaClient } from '@prisma/client/extension';
import { injectable } from 'inversify';

@injectable()
export class PrismaService {
  private _client = new PrismaClient();

  get client() {
    return this._client;
  }
}