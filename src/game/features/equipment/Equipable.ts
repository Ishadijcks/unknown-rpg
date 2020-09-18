import {EquipmentType} from "@/game/features/equipment/EquipmentType";
import {CombatStats} from "@/game/features/combat/CombatStats";
import {Consumable} from "@/game/items/Consumable";

export interface Equipable extends CombatStats {
    equipmentType: EquipmentType;
}

export function isEquipable(object: any): object is Consumable {
    return object.equipmentType != undefined;
}
