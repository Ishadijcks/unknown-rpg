import {RecipeId} from "@/game/features/recipes/RecipeId";
import {ItemAmount} from "@/game/items/ItemAmount";
import {Requirement} from "@/engine/requirements/Requirement";
import {Experience} from "@/game/features/skills/Experience";

export class Recipe {
    id: RecipeId;
    duration: number;
    input: ItemAmount[];
    output: ItemAmount[];
    requirements: Requirement[];
    expReward?: Experience


    constructor(id: RecipeId, duration: number, input: ItemAmount[], output: ItemAmount[], expReward?: Experience, requirements: Requirement[] = []) {
        this.id = id;
        this.duration = duration;
        this.input = input;
        this.output = output;
        this.requirements = requirements;
        this.expReward = expReward;
    }
}
