import { OpenapiFactory } from '@cosmoosjs/hono-openapi';
import type { User } from '@prisma/client';
import type { UserLoginInput } from './user.type';

export const UserInputSchema = OpenapiFactory.generateSchema<User>({
  schemaName: 'UserInput',
  params: [
    {
      required: true,
      type: 'string',
      name: 'email',
    },
    {
      required: true,
      type: 'string',
      name: 'name',
    },
    {
      required: true,
      type: 'string',
      name: 'password',
    },
  ],
});

export const UserLoginInputSchema = OpenapiFactory.generateSchema<UserLoginInput>({
  schemaName: 'UserInput',
  params: [
    {
      required: true,
      type: 'string',
      name: 'email',
    },
    {
      required: true,
      type: 'string',
      name: 'password',
    },
  ],
});
