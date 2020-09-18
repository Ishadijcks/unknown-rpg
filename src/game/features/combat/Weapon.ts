import {Attack} from "@/game/features/combat/Attack";
import {Equipment} from "@/game/features/equipment/Equipment";
import {EquipmentType} from "@/game/features/equipment/EquipmentType";
import {ItemId} from "@/game/items/ItemId";
import {CombatStats} from "@/game/features/combat/CombatStats";

export class Weapon extends Equipment {
    attacks: Attack[];

    constructor(name: string, id: ItemId, equipmentType: EquipmentType, stats: CombatStats, attacks: Attack[]) {
        super(name, id, EquipmentType.Weapon, stats);
        this.attacks = attacks;
    }
}
