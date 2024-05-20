import path from 'path';
import parse from "csv-simple-parser";
import { prisma } from "../src/configs/database";
import { CleanedDatasetSchema } from "../src/models/dtos/RecipeDTO";
import { ResponseError } from "../src/libs/ResponseError";

export class UtilTest {
  // Clear all data in database before running tests
  static async clearDatabase() {
    await prisma.recipe.deleteMany();
  }

  // Estimated 13503 data from dataset-cleaned.csv
  static async initializeDataset() {
    const pathUrl = '../dataset/cleaned/dataset-cleaned.csv';
    const file = Bun.file(path.resolve(__dirname, pathUrl));

    if(!file.exists()) throw new ResponseError(500, 'File not found');

    const csv:CleanedDatasetSchema[] = parse(await file.text(), { header: true }) as unknown as CleanedDatasetSchema[];
    
    for (const row of csv) {
      const loves = parseInt(String(row.Loves), 10);
      
      if (!row.Title || !row.Ingredients || !row.Steps || !row.URL || isNaN(loves)) continue; 

      await prisma.recipe.create({
        data: {
          title: row.Title,
          ingredients: row.Ingredients,
          steps: row.Steps,
          loves: loves, 
          url: row.URL,
          category: row.Category,
        },
      });
    }

  }
}

