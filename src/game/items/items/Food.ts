import {Consumable} from "@/game/items/Consumable";
import {Item} from "@/game/items/Item";
import {App} from "@/App";
import {ItemId} from "@/game/items/ItemId";
import {ItemType} from "@/game/items/ItemType";

export class Food extends Item implements Consumable {
    healValue: number;

    label: string = "Heal";


    constructor(name: string, id: ItemId, healValue: number) {
        super(name, id, ItemType.Global, Infinity);
        this.healValue = healValue;
    }

    consume(): void {
        App.game.equipment.gainHealth(this.healValue);
    }

    canConsume(): boolean {
        return true;
    }

}
