import {EquipmentType} from "@/game/items/EquipmentType";
import {CombatStats} from "@/game/features/combat/CombatStats";

export interface Equipable extends CombatStats {
    equipmentType: EquipmentType;
}
