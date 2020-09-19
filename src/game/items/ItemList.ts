import {ItemId} from "@/game/items/ItemId";
import {Item} from "@/game/items/Item";
import {ItemType} from "@/game/items/ItemType";
import {MoneyPotion} from "@/game/items/items/MoneyPotion";
import {EquipableInventory} from "@/game/items/EquipableInventory";
import {Inventory} from "@/game/features/inventory/Inventory";
import {InventoryId} from "@/game/features/inventory/InventoryId";
import {Weapon} from "@/game/features/combat/Weapon";
import {EquipmentType} from "@/game/features/equipment/EquipmentType";
import {Attack} from "@/game/features/combat/Attack";
import {WeaponType} from "@/game/features/combat/WeaponType";
import {Food} from "@/game/items/items/Food";

export class ItemList {
    static items: Record<ItemId, Item> = {} as Record<ItemId, Item>;

    static initialize() {
        this.registerItem(new Item("Empty", ItemId.Empty, ItemType.Empty, 0));
        this.registerItem(new MoneyPotion(10));
        this.registerItem(new EquipableInventory("Fish Inventory", ItemId.FishInventory1, new Inventory(InventoryId.Fish1, 6, [ItemType.Fish], ItemId.FishInventory1)));
        this.registerItem(new EquipableInventory("Ore Inventory", ItemId.OreInventory1, new Inventory(InventoryId.Ore1, 6, [ItemType.Ore], ItemId.OreInventory1)));
        this.registerItem(new Item("Fish1", ItemId.Fish1, ItemType.Fish, 5));
        this.registerItem(new Food("CookedFish1", ItemId.CookedFish1, 25));
        this.registerItem(new Item("Ore 1", ItemId.Ore1, ItemType.Ore, 50));
        this.registerItem(new Item("Ore 2", ItemId.Ore2, ItemType.Ore, 50));
        this.registerItem(new Item("Bar 1", ItemId.Bar1, ItemType.Global, Infinity));

        this.registerItem(new Item("Feathers", ItemId.Feathers, ItemType.Global, Infinity));
        this.registerItem(new Item("Bones", ItemId.Bones, ItemType.Global, Infinity));
        this.registerItem(new Item("Egg", ItemId.Egg, ItemType.Global, Infinity));

        this.registerItem(new Weapon("Sword", ItemId.SomeSword, EquipmentType.Weapon,
            {
                meleeAttack: 10
            },
            [new Attack("Poke", WeaponType.Melee, 1, 1, 2)])
        );
        this.registerItem(new Weapon("Sword2", ItemId.AnotherSword, EquipmentType.Weapon,
            {
                meleeAttack: 20
            },
            [new Attack("Poke2", WeaponType.Melee, 1, 1, 3)])
        );
    }

    static registerItem(item: Item) {
        this.items[item.id] = item;
    }

    static getItem(id: ItemId): Item {
        if (this.items[id] == null) {
            console.error(`Could not find item with id ${id}`);
        }
        return this.items[id];
    }
}
