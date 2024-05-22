import Elysia, { t } from "elysia"
import { prisma } from "../setup/database";
import { ResponseError } from "../libs/ResponseError";
import { RecipeDTO } from "../models/recipes/recipe-dto";
import jwt from "@elysiajs/jwt";
import { env } from "../setup/env";
import { HttpCode } from "../libs/HttpCode";
import bearer from "@elysiajs/bearer";
import { Logging } from "../libs/Logging";

export default new Elysia()
  .decorate("db", prisma)
  .use(
    jwt({
      name: 'jwt',
      secret: env.JWT_SECRET,
      exp: '3d'
    })
  )
  .use(bearer())
  .onBeforeHandle(async ({ jwt, bearer, set, db }) => {
    set.status = HttpCode.unauthorized;
    if(!bearer) {
      Logging.error("No bearer token provided at /recipes");
      return new ResponseError(HttpCode.unauthorized, "Unauthorized").toJson();
    }

    const extract_token = await jwt.verify(bearer);
    
    if(!extract_token){
      Logging.error("Invalid extract token provided at /recipes");
      return new ResponseError(HttpCode.unauthorized, "Unauthorized").toJson();
    }

    if(extract_token.exp! < Math.floor(Date.now() / 1000)) {
      Logging.error("Token expired at /recipes");
      await db.token.delete({
        where: {
          id: extract_token.id.toString(),
        },
      });
      return new ResponseError(HttpCode.unauthorized, "Token expired").toJson();
    }

    const validate_token = await db.token.findFirst({
      where: {
        token: bearer,
        accountId: extract_token.id.toString(),
      }
    });

    if(!validate_token) {
      Logging.error("Token not found in database at /recipes");
      return new ResponseError(HttpCode.unauthorized, "Unauthorized").toJson();
    }

    set.status = HttpCode.success;
  }) 
  .group("/recipes", (router) => 
    router
      // Get All Recipes Endpoint
      .get(
        "/:page/:limit", async ({ db, params, set }) => {
          try {
            const response: RecipeDTO[] = await db.recipe.findMany({
              skip: (parseInt(params.page) - 1) * parseInt(params.limit),
              take: parseInt(params.limit),
            });

            Logging.info("Success get all recipes");
            set.status = HttpCode.success;
            return {
              code: HttpCode.success,
              message: "Success get all recipes",
              data: response,
            };

          } catch(e) {
            Logging.error(e instanceof ResponseError ? e.message : 'Internal Server Error at /recipes');
            set.status = e instanceof ResponseError ? e.code : HttpCode.internalServerError;
            return e instanceof ResponseError ?
              e.toJson() : ResponseError.fromError(e as Error).toJson();

          }
        }, {
          params: t.Object({
            page: t.String(),
            limit: t.String(),
          }),
          detail: { 
            tags: ['Recipes']
          }
        }
      )
      // Get Recipes By Name Endpoint
      .get(
          "/search/:title/:page/:limit", async ({ db, params, set }) => {
          try {
            const response: RecipeDTO[] = await db.recipe.findMany({
              where: {
                title: {
                  contains: params.title,
                },
              },
              skip: (parseInt(params.page) - 1) * parseInt(params.limit),
              take: parseInt(params.limit),
            });

            Logging.info("Success get recipes by name");
            set.status = HttpCode.success;
            return {
              code: HttpCode.success,
              message: "Success get recipes by name",
              data: response,
            };
          } catch(e) {
            Logging.error(e instanceof ResponseError ? e.message : 'Internal Server Error at /recipes/search');
            set.status = e instanceof ResponseError ? e.code : HttpCode.internalServerError;
            return e instanceof ResponseError ? 
              e.toJson() : ResponseError.fromError(e as Error).toJson();

          }
        }, {
          params: t.Object({
            title: t.String(),
            page: t.String(),
            limit: t.String(),
          }),
          detail: { 
            tags: ['Recipes']
          }
        }
      )
  )