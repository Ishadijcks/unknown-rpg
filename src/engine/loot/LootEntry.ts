import {IntRange} from "@/engine/loot/IntRange";
import {Requirement} from "@/engine/requirements/Requirement";
import {ItemAmount} from "@/game/items/ItemAmount";

export abstract class LootEntry {
    public weight: number;
    public amount: IntRange;
    public requirements: Requirement[];


    protected constructor(weight: number = 1, amount: IntRange = new IntRange(1, 1), requirements: Requirement[] = []) {
        this.weight = weight;
        this.amount = amount;
        this.requirements = requirements;
    }

    public canGet(): boolean {
        for (const req of this.requirements) {
            if (!req.isCompleted()) {
                return false;
            }
        }
        return true;
    }

    public abstract getLoot(): ItemAmount[];
}
