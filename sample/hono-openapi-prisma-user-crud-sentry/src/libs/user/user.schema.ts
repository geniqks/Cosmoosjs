import { OpenapiFactory } from '@cosmosjs/hono-openapi';
import type { UserLoginInput } from './user.type';

export const UserInputSchema = OpenapiFactory.generateSchema<UserLoginInput>({
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
