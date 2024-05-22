import Elysia, { t } from "elysia"
import { RecipeService } from "../services/recipe-service"
import { prisma } from "../setup/database";
import { ResponseError } from "../libs/ResponseError";
import { RecipeDTO } from "../models/recipes/recipe-dto";

export default new Elysia()
  .decorate("db", prisma)
  .group("/recipes", (router) => 
    router
      .get(
        "/:page/:limit", async ({ db, params, set }) => {
          try {
            const response: RecipeDTO[] = await RecipeService.getAllRecipes({ 
              db, page: params.page, limit: params.limit 
            });

            set.status = 200;
            return response;
          } catch(e) {

            set.status = e instanceof ResponseError ? e.code : 500;
            return e instanceof ResponseError ? e.message : "Internal Server Error";
          }
        }, {
          params: t.Object({
            page: t.Number(),
            limit: t.Number(),
          }),
        }
      )
      .get(
          "/search/:title/:page/:limit", async ({ db, params, set }) => {
          try {
            const response: RecipeDTO[] = await RecipeService.getRecipesByName({ 
              db, title: params.title, page: params.page, limit: params.limit 
            });

            return response;
          } catch(e) {
            
            set.status = e instanceof ResponseError ? e.code : 500;
            return e instanceof ResponseError ? e.message : "Internal Server Error";
          }
        }, {
          params: t.Object({
            title: t.String(),
            page: t.Number(),
            limit: t.Number(),
          }),
        }
      )
  )