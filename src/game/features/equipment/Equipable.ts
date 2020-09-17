import {EquipmentType} from "@/game/features/equipment/EquipmentType";
import {CombatStats} from "@/game/features/combat/CombatStats";

export interface Equipable extends CombatStats {
    equipmentType: EquipmentType;
}
