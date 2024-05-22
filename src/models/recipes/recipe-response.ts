import { BaseResponse } from "../baseResponse";
import { RecipeDTO } from "./recipe-dto";

export interface GetAllRecipesResponse extends BaseResponse {
  recipes: RecipeDTO[];
}

export interface GetRecipesByNameResponse extends BaseResponse {
  recipes: RecipeDTO[];
}

