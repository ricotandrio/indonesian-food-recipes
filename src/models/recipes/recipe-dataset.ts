import { RecipeDTO } from "./recipe-dto";

export interface CleanedRecipeDatasetSchema {
  Title: string;
  Ingredients: string;
  Steps: string;
  Loves: number;
  URL: string;
  Category: string;
}

export const toRecipeDTO = (data: CleanedRecipeDatasetSchema): RecipeDTO => {
  return {
    title: data.Title,
    ingredients: data.Ingredients,
    steps: data.Steps,
    loves: data.Loves,
    url: data.URL,
    category: data.Category,
  };
};