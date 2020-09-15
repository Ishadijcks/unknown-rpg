import {RecipeId} from "@/game/features/recipes/RecipeId";
import {Recipe} from "@/game/features/recipes/Recipe";

export class RecipeList {
    static list: Record<RecipeId, Recipe> = {} as Record<RecipeId, Recipe>;

    static registerRecipe(recipe: Recipe) {
        this.list[recipe.id] = recipe;
    }

    static getRecipe(id: RecipeId): Recipe {
        if (this.list[id] == null) {
            throw Error(`Cannot get recipe for id ${id}`);
        }
        return this.list[id];
    }
}
