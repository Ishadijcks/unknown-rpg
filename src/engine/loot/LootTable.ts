import {LootTableId} from "@/engine/loot/LootTableId";
import {LootEntry} from "@/engine/loot/LootEntry";
import {ItemAmount} from "@/game/items/ItemAmount";
import {Random} from "@/engine/probability/Random";

export class LootTable {
    id: LootTableId;

    public always: LootEntry[];
    public oneOf: LootEntry[];
    public anyOf: LootEntry[];

    constructor(id: LootTableId, always: LootEntry[], oneOf: LootEntry[], anyOf: LootEntry[]) {
        this.id = id;
        this.always = always;
        this.oneOf = oneOf;
        this.anyOf = anyOf
    }

    public getLoot(): ItemAmount[] {

        const always = this.calculateAlwaysLoot();
        const oneof = this.calculateOneOfLoot();
        const anyof = this.calculateAnyOfLoot();

        const total = always.concat(oneof).concat(anyof);

        return this.simplifyLoot(total);
    }

    public calculateAlwaysLoot(): ItemAmount[] {
        let alwaysLoot: ItemAmount[] = [];
        for (const reward of this.always) {
            alwaysLoot = alwaysLoot.concat(reward.getLoot());
        }

        return alwaysLoot;
    }

    public calculateOneOfLoot(): ItemAmount[] {
        const sum = LootTable.calculateWeightSum(this.oneOf);
        let draw = Random.floatBetween(0, sum)
        for (let i = 0; i < this.oneOf.length; i++) {
            if (draw <= this.oneOf[i].weight) {
                return this.oneOf[i].getLoot();
            } else {
                draw -= this.oneOf[i].weight;
            }
        }
        return [];
    }

    public static calculateWeightSum(rewards: LootEntry[]) {
        let sum = 0;
        for (const key of rewards) {
            sum += key.weight;
        }
        return sum;
    }

    public calculateAnyOfLoot(): ItemAmount[] {
        let anyOfLoot: ItemAmount[] = [];
        for (const reward of this.anyOf) {
            if (Random.booleanWithProbability(reward.weight)) {
                anyOfLoot = anyOfLoot.concat(reward.getLoot())
            }
        }
        return anyOfLoot;
    }

    public simplifyLoot(loots: ItemAmount[]): ItemAmount[] {
        const ret: ItemAmount[] = [];
        for (const key in loots) {
            const loot = loots[key];
            const index = ret.findIndex(l => l.item === loot.item);
            if (index !== -1) {
                ret[index].amount += loot.amount;
            } else {
                ret.push(loot);
            }
        }
        return ret;
    }


}
