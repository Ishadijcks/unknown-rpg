import {LootEntry} from "@/engine/loot/LootEntry";
import {ItemId} from "@/game/items/ItemId";
import {IntRange} from "@/engine/loot/IntRange";
import {Requirement} from "@/engine/requirements/Requirement";
import {ItemAmount} from "@/game/items/ItemAmount";

export class ItemEntry extends LootEntry {
    public item: ItemId;

    constructor(item: ItemId, weight: number = 1, amount: IntRange = new IntRange(1, 1), requirements: Requirement[] = []) {
        super(weight, amount, requirements);
        this.item = item;
    }

    getLoot(): ItemAmount[] {
        if (!this.canGet()) {
            console.warn(`Tried to get loot ${this.item}, but the requirements were not met`);
            return [];
        }
        return [new ItemAmount(this.item, this.amount.getRandomBetween())];
    }

}
