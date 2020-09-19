import {LootTableId} from "@/engine/loot/LootTableId";
import {LootEntry} from "@/engine/loot/LootEntry";
import {ItemAmount} from "@/game/items/ItemAmount";
import {Random} from "@/engine/probability/Random";

export class LootTable {
    id: LootTableId;

    /**
     * All loot that is added on every roll
     */
    public always: LootEntry[];

    /**
     * Only one of these will be selected based on their relative weight
     */
    public oneOf: LootEntry[];

    /**
     * Any of these have an independent chance to be added to the roll.
     */
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
        const availableLoot = LootTable.filterOnRequirements(this.always);
        for (const reward of availableLoot) {
            alwaysLoot = alwaysLoot.concat(reward.getLoot());
        }

        return alwaysLoot;
    }

    public calculateOneOfLoot(): ItemAmount[] {
        const availableLoot = LootTable.filterOnRequirements(this.oneOf);
        const sum = LootTable.calculateWeightSum(availableLoot);
        let draw = Random.floatBetween(0, sum)
        for (let i = 0; i < availableLoot.length; i++) {
            if (draw <= availableLoot[i].weight) {
                return availableLoot[i].getLoot();
            } else {
                draw -= availableLoot[i].weight;
            }
        }
        return [];
    }

    /**
     * Remove all entries that do not have their requirements met;
     * @param loot
     */
    public static filterOnRequirements(loot: LootEntry[]): LootEntry[] {
        return loot.filter(l => l.canGet());
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
        const availableLoot = LootTable.filterOnRequirements(this.anyOf);

        for (const reward of availableLoot) {
            if (Random.booleanWithProbability(reward.weight)) {
                anyOfLoot = anyOfLoot.concat(reward.getLoot())
            }
        }
        return anyOfLoot;
    }

    /**
     * Merge duplicate ItemAmount together
     */
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
