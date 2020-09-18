import {Item} from "@/game/items/Item";
import {Equipable} from "@/game/features/equipment/Equipable";
import {EquipmentType} from "@/game/features/equipment/EquipmentType";
import {ItemType} from "@/game/items/ItemType";
import {ItemId} from "@/game/items/ItemId";
import {CombatStats} from "@/game/features/combat/CombatStats";

export class Equipment extends Item implements Equipable {
    equipmentType: EquipmentType;

    criticalChance: number;
    dodgeChance: number;
    mageAttack: number;
    mageDefense: number;
    meleeAttack: number;
    meleeDefense: number;
    rangeAttack: number;
    rangeDefense: number;

    constructor(name: string, id: ItemId, equipmentType: EquipmentType, stats: CombatStats) {
        super(name, id, ItemType.Global, 1);
        this.equipmentType = equipmentType;

        this.criticalChance = stats.criticalChance ?? 0;
        this.dodgeChance = stats.dodgeChance ?? 0;
        this.mageAttack = stats.mageAttack ?? 0;
        this.mageDefense = stats.mageDefense ?? 0;
        this.meleeAttack = stats.meleeAttack ?? 0;
        this.meleeDefense = stats.meleeDefense ?? 0;
        this.rangeAttack = stats.rangeAttack ?? 0;
        this.rangeDefense = stats.rangeDefense ?? 0;
    }


}
