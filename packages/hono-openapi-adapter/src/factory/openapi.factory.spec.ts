import { describe, expect, it } from 'bun:test';
import { OpenapiFactory } from '@cosmoosjs/hono-openapi';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

describe('OpenApiFactory', () => {
  const server = new OpenAPIHono();

  describe('post requests', async () => {
    const testPostSchema = OpenapiFactory.generateSchema({
      schemaName: 'testSchema',
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

    const postRoute = createRoute({
      method: 'post',
      path: '/schemaValidation',
      request: {
        body: {
          content: {
            'application/json': {
              schema: testPostSchema,
            },
          },
        },
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: z.object({
                message: z.string(),
              }),
            },
          },
          description: 'ok',
        },
        400: {
          content: {
            'application/json': {
              schema: z.object({}),
            },
          },
          description: 'zod error',
        },
      },
    });
    server.openapi(postRoute, async (ctx) => {
      return ctx.json({
        message: 'ok',
      });
    });

    it('it should generate a schema and let the request go', async () => {
      const res = await server.request('/schemaValidation', {
        method: 'post',
        body: JSON.stringify({
          email: 'salut@gmail.com',
          name: 'test',
          password: '123AZN',
        }),
      });

      const response = await res.json();
      expect(res.status).toEqual(200);
      expect(response).toEqual({
        message: 'ok',
      });
    });

    it('it should generate a schema and return an error because name is missing  ', async () => {
      const res = await server.request('/schemaValidation', {
        method: 'post',
      });

      const response = await res.json();
      expect(res.status).toEqual(400);
      expect(response).toMatchObject({
        success: false,
      });
    });
  });
});
