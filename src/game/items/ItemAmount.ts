import {ItemId} from "@/game/items/ItemId";

export class ItemAmount {
    item: ItemId;
    amount: number;


    constructor(item: ItemId, amount: number = 1) {
        this.item = item;
        this.amount = amount;
    }

    toString(): string {
        return `(${this.amount} ${this.item})`;
    }
}
