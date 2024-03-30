import { OpenapiFactory } from "@cosmoosjs/hono-openapi";

export const AuthorizationSchema = OpenapiFactory.generateSchema({
  params: [
    {
      required: true,
      type: 'any',
      example: 'Bearer token...',
      name: 'Authorization',
    },
  ],
});
