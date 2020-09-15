import {PlayerAction} from "@/game/features/player/PlayerAction";
import {Recipe} from "@/game/features/recipes/Recipe";
import {App} from "@/App";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";

export class RecipeAction extends PlayerAction {
    recipe: Recipe;


    constructor(description: string, location: WorldLocationIdentifier, duration: number, recipe: Recipe, repeat: number,) {
        super(description, location, duration, repeat);
        this.recipe = recipe;
    }

    gainReward(): boolean {
        if (this.recipe.expReward) {
            App.game.skills.gainExperience(this.recipe.expReward);
        }
        return false;
    }

    clone(): RecipeAction {
        return new RecipeAction(this.description, this.location, this.duration, this.recipe, this.repeat);
    }

}
