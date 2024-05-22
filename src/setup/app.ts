import Elysia from "elysia";
import { cors } from "@elysiajs/cors";
import recipeController from "../controllers/recipe-controller";
import accountController from "../controllers/account-controller";
import { swagger } from "@elysiajs/swagger";
import { prisma } from "./database";
import { HttpCode } from "../libs/HttpCode";
import { Logging } from "../libs/Logging";

export const app = new Elysia({ prefix: "/api/v1" })
  .use(cors())
  .use(swagger({
    documentation: {
      info: {
        title: "Indonesian Food Recipes Documentation",
        description: "This is a documentation for Indonesian Food Recipes API. Built with ElysiaJS and Prisma ORM.",
        version: "1.0.0",
      },
      tags: [
        {
          name: "Account",
          description: "Account related endpoints",
        },
        {
          name: "Recipes",
          description: "Recipes related endpoints",
        },
        {
          name: "Root",
          description: "Root endpoint",
        }
      ]
    }
  }))
  .use(accountController)
  .use(recipeController)
  .get("/", async ({ set }) => {
    set.status = HttpCode.success;
    return {
      code: HttpCode.success,
      message: "Hello from Indonesian Food Recipes API 🍜🍲🍛",
    };
  }, {
    detail: {
      tags: ["Root"]
    }
  });