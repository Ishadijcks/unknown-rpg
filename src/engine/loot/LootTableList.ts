import {LootTableId} from "@/engine/loot/LootTableId";
import {ItemAmount} from "@/game/items/ItemAmount";
import {LootTable} from "@/engine/loot/LootTable";
import {ItemId} from "@/game/items/ItemId";
import {ItemEntry} from "@/engine/loot/ItemEntry";
import {TableEntry} from "@/engine/loot/TableEntry";
import {IntRange} from "@/engine/probability/IntRange";
import {SkillRequirement} from "@/game/features/skills/SkillRequirement";
import {SkillType} from "@/game/features/skills/SkillType";

/**
 * Contains a record of all tables. Also provides helper functions such as interpolation between tables.
 */
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

        this.registerTable(
            new LootTable(LootTableId.Chicken,
                [new ItemEntry(ItemId.Bones), new ItemEntry(ItemId.Feathers, 1, new IntRange(3, 7))],
                [],
                [new ItemEntry(ItemId.Egg, 1, new IntRange(1, 1), [new SkillRequirement(SkillType.Cooking, 2)])]
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
