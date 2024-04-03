# hono-openapi-prisma-user-crud-sentry

## Setup

> Note — At the moment Prisma needs Node.js to be installed to run certain generation code. Make sure Node.js is installed in the environment where you're running bunx prisma commands.

```bash
$ docker compose up -d
$ bun i
$ bunx prisma generate
$ bunx prisma migrate dev
$ bun dev
```

> If you use the sample outside the workspace you will need to do the following :

```bash
$ bun i @cosmoosjs/core
$ bun i @cosmoosjs/hono-openapi
```

Once the server started, go to http://localhost:${PORT}/swagger

# Troubleshooting

## Types

At the moment you can have some type error with hono ignore them using
@ts-ignore
