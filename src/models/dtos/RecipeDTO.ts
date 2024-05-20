export interface RecipeDTO {
  title: string;
  ingredients: string;
  steps: string;
  loves: number;
  url: string;
  categoryId: string;
}

export interface RecipeDatasetSchema {
  Title: string;
  Ingredients: string;
  Steps: string;
  Loves: number;
  URL: string;
  Category: string;
}

export const toRecipeDTO = (data: RecipeDatasetSchema): RecipeDTO => {
  return {
    title: data.Title,
    ingredients: data.Ingredients,
    steps: data.Steps,
    loves: Number(data.Loves),
    url: data.URL,
    categoryId: data.Category,
  };
}