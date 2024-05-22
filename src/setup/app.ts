import Elysia from "elysia";
import { cors } from "@elysiajs/cors";
import recipeController from "../controllers/recipe-controller";
import accountController from "../controllers/account-controller";
import { swagger } from "@elysiajs/swagger";

export const app = new Elysia({ prefix: "/api/v1" })
  .use(cors())
  .use(accountController)
  .use(recipeController)