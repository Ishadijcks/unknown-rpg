import {Item} from "@/game/items/Item";
import {Equipable} from "@/game/features/equipment/Equipable";
import {EquipmentType} from "@/game/features/equipment/EquipmentType";
import {ItemType} from "@/game/items/ItemType";
import {ItemId} from "@/game/items/ItemId";

export class Equipment extends Item implements Equipable {
    equipmentType: EquipmentType;


    constructor(name: string, id: ItemId, equipmentType: EquipmentType) {
        super(name, id, ItemType.Global, 1);
        this.equipmentType = equipmentType;
    }
}
