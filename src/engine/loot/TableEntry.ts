import {LootEntry} from "@/engine/loot/LootEntry";
import {LootTableId} from "@/engine/loot/LootTableId";
import {ItemAmount} from "@/game/items/ItemAmount";
import {IntRange} from "@/engine/probability/IntRange";
import {Requirement} from "@/engine/requirements/Requirement";
import {LootTableList} from "@/engine/loot/LootTableList";

export class TableEntry extends LootEntry {
    id: LootTableId;

    constructor(id: LootTableId, weight: number = 1, amount: IntRange = new IntRange(1,1), requirements: Requirement[] = []) {
        super(weight, amount, requirements);
        this.id = id;
    }

    getLoot(): ItemAmount[] {
        return LootTableList.roll(this.id);
    }

}
