import { OpenapiFactory } from '@cosmosjs/hono-openapi';
import type { User } from '@prisma/client';

export const UserInputSchema = OpenapiFactory.generateSchema<User>({
  schemaName: 'UserInput',
  params: [
    {
      required: true,
      type: 'string',
      name: 'name',
    },
    {
      required: true,
      type: 'string',
      name: 'email',
    },
  ],
});
