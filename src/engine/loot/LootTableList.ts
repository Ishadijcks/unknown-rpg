import {LootTableId} from "@/engine/loot/LootTableId";
import {ItemAmount} from "@/game/items/ItemAmount";
import {LootTable} from "@/engine/loot/LootTable";
import {ItemId} from "@/game/items/ItemId";
import {ItemEntry} from "@/engine/loot/ItemEntry";
import {TableEntry} from "@/engine/loot/TableEntry";
import {IntRange} from "@/engine/loot/IntRange";

export class LootTableList {
    static tables: Record<LootTableId, LootTable> = {} as Record<LootTableId, LootTable>;

    static initialize() {
        this.registerTable(
            new LootTable(LootTableId.Example,
                [new TableEntry(LootTableId.Another)],
                [],
                []
            ),
        );
        this.registerTable(
            new LootTable(LootTableId.Another,
                [new ItemEntry(ItemId.Ore1)],
                [new ItemEntry(ItemId.Fish1, 9), new ItemEntry(ItemId.Fish2, 1, new IntRange(3, 5))],
                [new ItemEntry(ItemId.SomeSword, 0.1)]
            )
        )
    }

    static registerTable(table: LootTable) {
        this.tables[table.id] = table;
    }


    static roll(id: LootTableId): ItemAmount[] {
        if (this.tables[id] == null) {
            console.warn(`Could not find table ${id}`);
            return [];
        }
        return this.tables[id].getLoot();
    }
}
