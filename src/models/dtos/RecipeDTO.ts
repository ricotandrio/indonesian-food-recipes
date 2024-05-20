export interface RecipeDTO {
  title: string;
  ingredients: string;
  steps: string;
  loves: number;
  url: string;
  category: string;
}

export interface CleanedDatasetSchema {
  Title: string;
  Ingredients: string;
  Steps: string;
  Loves: number;
  URL: string;
  Category: string;
}

export const toRecipeDTO = (data: CleanedDatasetSchema): RecipeDTO => {
  return {
    title: data.Title,
    ingredients: data.Ingredients,
    steps: data.Steps,
    loves: data.Loves,
    url: data.URL,
    category: data.Category,
  };
};