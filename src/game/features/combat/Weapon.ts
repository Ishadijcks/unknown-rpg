import {Attack} from "@/game/features/combat/Attack";
import {Equipment} from "@/game/features/equipment/Equipment";
import {EquipmentType} from "@/game/features/equipment/EquipmentType";
import {ItemId} from "@/game/items/ItemId";

export class Weapon extends Equipment {
    attacks: Attack[];


    constructor(name: string, id: ItemId, equipmentType: EquipmentType, attacks: Attack[]) {
        super(name, id, EquipmentType.Weapon);
        this.attacks = attacks;
    }
}
