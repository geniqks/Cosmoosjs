import { describe, expect, it } from 'bun:test';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { OpenapiFactory } from './openapi.factory';

describe.only('OpenApiFactory', () => {
  const server = new OpenAPIHono();
  function requestFormatterHelper(method: 'post' | 'get', body?: Object): RequestInit {
    if (method === 'post') {
      return {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
    }

    return {
      method,
    };
  }

  describe.only('post requests', async () => {
    const testPostSchema = OpenapiFactory.generateSchema({
      schemaName: 'testSchema',
      params: [
        {
          required: true,
          type: 'string',
          name: 'email',
          rules: [
            {
              functionName: 'email',
            },
          ],
        },
        {
          required: true,
          type: 'string',
          name: 'name',
          rules: [
            {
              functionName: 'min',
              functionParam: 3,
            },
            {
              functionName: 'max',
              functionParam: 6,
            },
          ],
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

    it.only('it let the request go', async () => {
      const res = await server.request(
        '/schemaValidation',
        requestFormatterHelper('post', {
          email: 'email@gmail.com',
          name: 'test',
          password: '123AZN',
        }),
      );

      const response = await res.json();
      expect(res.status).toEqual(200);
      expect(response).toEqual({
        message: 'ok',
      });
    });

    it.only('it return an error because name is missing  ', async () => {
      const res = await server.request(
        '/schemaValidation',
        requestFormatterHelper('post', {
          email: 'email@gmail.com',
          password: '123AZN',
        }),
      );

      const response = await res.json();
      expect(res.status).toEqual(400);
      expect(response).toMatchObject({
        success: false,
      });
    });

    it.only('it should return an error because email is not formatted correctly', async () => {
      const res = await server.request(
        '/schemaValidation',
        requestFormatterHelper('post', {
          email: 'email',
          name: 'test',
          password: '123AZN',
        }),
      );

      const response = await res.json();
      expect(res.status).toEqual(400);
      expect(response).toMatchObject({
        success: false,
      });
    });

    it.only('it should return an error because name.length < 3', async () => {
      const res = await server.request(
        '/schemaValidation',
        requestFormatterHelper('post', {
          email: 'email@gmail.cm',
          name: '12',
          password: '123AZN',
        }),
      );

      const response = await res.json();
      expect(res.status).toEqual(400);
      expect(response).toMatchObject({
        success: false,
      });
    });

    it.only('it should return an error because name.length > 6', async () => {
      const res = await server.request(
        '/schemaValidation',
        requestFormatterHelper('post', {
          email: 'email@gmail.cm',
          name: '1234567',
          password: '123AZN',
        }),
      );

      const response = await res.json();
      expect(res.status).toEqual(400);
      expect(response).toMatchObject({
        success: false,
      });
    });
  });

  describe.only('get requests', async () => {
    const testGetSchema = OpenapiFactory.generateSchema({
      schemaName: 'testSchema',
      params: [
        {
          required: true,
          type: 'string',
          name: 'email',
          rules: [
            {
              functionName: 'email',
            },
          ],
        },
      ],
    });

    const getRoute = createRoute({
      method: 'get',
      path: '/schemaGetValidation',
      request: {
        query: testGetSchema,
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
    server.openapi(getRoute, async (ctx) => {
      return ctx.json({
        message: 'ok',
      });
    });

    it.only('it should return an error because email is missing', async () => {
      const res = await server.request('/schemaGetValidation', requestFormatterHelper('get'));

      const response = await res.json();
      expect(res.status).toEqual(400);
      expect(response).toMatchObject({
        success: false,
      });
    });

    it.only('it should let the request go', async () => {
      const res = await server.request('/schemaGetValidation?email=hello@gmail.com', requestFormatterHelper('get'));

      const response = await res.json();
      expect(res.status).toEqual(200);
      expect(response).toEqual({
        message: 'ok',
      });
    });

    it.only('it should return an error because email is not formatted correctly', async () => {
      const res = await server.request('/schemaGetValidation?email=hello', requestFormatterHelper('get'));

      const response = await res.json();
      expect(res.status).toEqual(400);
      expect(response).toMatchObject({
        success: false,
      });
    });
  });
});
