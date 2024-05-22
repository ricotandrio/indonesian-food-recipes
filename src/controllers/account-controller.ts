import Elysia, { t } from "elysia";
import { prisma } from "../setup/database";
import { AccountService } from "../services/account-service";
import { ResponseError } from "../libs/ResponseError";

export default new Elysia()
  .decorate('db', prisma)
  .group('/account', (router) => 
    router
      .post(
          '/login', async ({ db, body, set }) => {
          try {
            const account = await AccountService.login({
              db: db,
              email: body.email,
              password: body.password,
            });

            return account;
          } catch(e) {
            set.status = e instanceof ResponseError ? e.code : 500;
            return e instanceof ResponseError ? e.message : "Internal Server Error";
          }
        }, {
          body: t.Object({
            email: t.String(),
            password: t.String(),
          }),
        }
      )
      .post(
        '/register', async ({ db, body, set }) => {
          try {
            const account = await AccountService.register({
              db: db,
              email: body.email,
              password: body.password,
            });

            return account;
          } catch(e) {
            set.status = e instanceof ResponseError ? e.code : 500;
            return e instanceof ResponseError ? e.message : "Internal Server Error";
          }
        }, {
          body: t.Object({
            email: t.String(),
            password: t.String(),
          }),
        }
      )
      
  );
