import {ItemId} from "@/game/items/ItemId";

export class ItemAmount {
    item: ItemId;
    amount: number;


    constructor(item: ItemId, amount: number) {
        this.item = item;
        this.amount = amount;
    }
}
