import Elysia, { t } from "elysia";
import { prisma } from "../setup/database";
import { ResponseError } from "../libs/ResponseError";
import jwt from "@elysiajs/jwt";
import { env } from "../setup/env";
import { HttpCode } from "../libs/HttpCode";
import { Logging } from "../libs/Logging";

export default new Elysia()
  .decorate('db', prisma)
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET,
      exp: '3d'
    })
  )
  .group('/account', (router) => 
    router
      // Register Endpoint
      .post(
        '/register', async ({ jwt, db, body, set }) => {
          try {
            const account = await db.account.create({
              data: {
                email: body.email,
                password: body.password,
              },
            });

            const token = await jwt.sign({ id: account.id });

            await db.token.create({
              data: {
                token: token,
                account: {
                  connect: {
                    id: account.id,
                  },
                },
              },
            });

            Logging.info(`Account with email ${account.email} has registered`);
            set.status = HttpCode.created;
            return {
              code: HttpCode.created,
              message: "Register success, welcome!",
              data: {
                ...account,
                token: token,
              },
            };
          } catch(e) {
            Logging.error(e instanceof ResponseError ? e.message : 'Internal Server Error at /account/register');
            set.status = e instanceof ResponseError ? e.code : HttpCode.internalServerError;

            return e instanceof ResponseError ? 
              e.toJson() : ResponseError.fromError(e as Error).toJson();
          }
        }, {
          body: t.Object({
            email: t.String(),
            password: t.String(),
          }),
          detail: { 
            tags: ['Account']
          }
        }
      )
      // Login Endpoint
      .post(
        '/login', async ({ jwt, db, body, set }) => {
        try {
          const account = await db.account.findFirst({
            where: {
              email: body.email,
              password: body.password,
            },
          });

          if(!account) throw new ResponseError(HttpCode.unauthorized, "Login failed, email or password is incorrect");

          const token = await jwt.sign({ id: account.id });

          await db.token.create({
            data: {
              token: token,
              account: {
                connect: {
                  id: account.id,
                },
              },
            },
          });

          Logging.info(`Account with email ${account.email} has logged in`);
          set.status = HttpCode.success;
          return {
            code: HttpCode.success,
            message: "Login success, welcome!",
            data: {
              account: account,
              token: token,
            },
          };
        } catch(e) {
          Logging.error(e instanceof ResponseError ? e.message : 'Internal Server Error at /account/login');
          set.status = e instanceof ResponseError ? e.code : HttpCode.internalServerError;

          return e instanceof ResponseError ? 
            e.toJson() : ResponseError.fromError(e as Error).toJson();
        }
      }, {
        body: t.Object({
          email: t.String(),
          password: t.String(),
        }),
        detail: { 
          tags: ['Account']
        }
      }
    )
      
  );
