import parse from "csv-simple-parser";
import { prisma } from "../src/configs/database";
import { RecipeDTO, RecipeDatasetSchema, toRecipeDTO } from "../src/models/dtos/RecipeDTO";
import path from 'path';
import { ResponseError } from "../src/libs/ResponseError";

export class UtilTest {
  static async createCategory() {
    const fill = await prisma.recipeCategory.createMany({
      data: [
        { name: "ayam" },
        { name: "ikan" },
        { name: "kambing" },
        { name: "sapi" },
        { name: "tahu"},
        { name: "telur" },
        { name: "tempe" },
        { name: "udang" },
      ],
    });

    if(!fill) {
      throw new ResponseError(500, 'Failed to fill category');
    }
  }

  static isValidString = (value: string) => value !== '' && value !== undefined && value !== null;
  static isValidNumber = (value: number) => value !== undefined && value !== null;

  static async readFrom(pathUrl: string, category: string) {
    const file = Bun.file(path.resolve(__dirname, pathUrl));

    if(!file.exists()) {
      throw new ResponseError(500, 'File not found');
    }

    const csv:RecipeDatasetSchema[] = parse(await file.text(), { header: true }) as unknown as RecipeDatasetSchema[];
    
    for(const row of csv) {

      if(UtilTest.isValidString(row.Title) 
        || UtilTest.isValidString(row.Ingredients) 
        || UtilTest.isValidString(row.Steps) 
        || UtilTest.isValidString(row.URL) 
        || UtilTest.isValidNumber(row.Loves)) {

        await prisma.recipe.create({
          data: toRecipeDTO({
            ...row,
            Category: category,
          }),
        });
      }

    }

  }

}