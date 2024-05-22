import { PrismaClient } from "@prisma/client";
import { ResponseError } from "../libs/ResponseError";
import { RecipeDTO } from "../models/recipes/recipe-dto";

export class RecipeService {
  static async getAllRecipes({ db, page, limit } : { 
    db: PrismaClient, page: number, limit: number 
  }) {
    const recipes: RecipeDTO[] = await db.recipe.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    if(!recipes) {
      throw new ResponseError(500, "Internal Server Error");
    }

    return recipes;
  }

  static async getRecipesByName({ db, title, page, limit } : {
    db: PrismaClient, title: string, page: number, limit: number
  }) {
      const recipes: RecipeDTO[] = await db.recipe.findMany({
        where: {
          title: {
            contains: title,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      
      if(!recipes) {
        throw new ResponseError(500, "Internal Server Error");
      }

      return recipes;
  }
}