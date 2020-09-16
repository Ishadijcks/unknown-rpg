import {PlayerAction} from "@/game/features/player/PlayerAction";
import {Recipe} from "@/game/features/recipes/Recipe";
import {App} from "@/App";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";

export class RecipeAction extends PlayerAction {
    recipe: Recipe;


    constructor(description: string, location: WorldLocationIdentifier, recipe: Recipe, repeat: number) {
        super(description, location, recipe.duration, repeat);
        this.recipe = recipe;
    }

    gainReward(): boolean {
        if (!App.game.playerInventory.hasItemAmounts(this.recipe.input)) {
            console.log("doesnt have input")
            return false;
        }
        if (!App.game.playerInventory.canTakeItemAmounts(this.recipe.output)) {
            console.log("cant take items")

            return false
        }

        if (this.recipe.expReward) {
            App.game.skills.gainExperience(this.recipe.expReward);
        }
        App.game.playerInventory.loseItemAmounts(this.recipe.input);
        console.log("Gaining items")

        App.game.playerInventory.gainItemAmounts(this.recipe.output);
        return true;
    }

    clone(): RecipeAction {
        return new RecipeAction(this.description, this.location, this.recipe, this.repeat);
    }

}
