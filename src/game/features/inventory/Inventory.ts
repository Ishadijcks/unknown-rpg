import {InventoryId} from "@/game/features/inventory/InventoryId";
import {InventoryItem} from "@/game/features/inventory/InventoryItem";
import {ItemType} from "@/game/items/ItemType";
import {ItemId} from "@/game/items/ItemId";
import {ItemList} from "@/game/items/ItemList";
import {isConsumable} from "@/game/items/Consumable";

export class Inventory {
    id: InventoryId;
    slots: number;
    items: InventoryItem[];
    acceptedTypes: ItemType[];

    itemRepresentation: ItemId;

    constructor(id: InventoryId, slots: number, acceptedTypes: ItemType[], itemRepresentation: ItemId) {
        this.id = id;
        this.slots = slots;
        this.items = [];
        for (let i = 0; i < this.slots; i++) {
            this.items.push(new InventoryItem(ItemId.Empty, 0, 0));
        }
        this.acceptedTypes = acceptedTypes;
        this.itemRepresentation = itemRepresentation;
    }

    consumeItem(index: number) {
        const id = this.items[index].id;
        const item = ItemList.getItem(id);


        if (!isConsumable(item)) {
            console.warn(`Item ${item} is not a consumable`);
            return;
        }
        if (this.getAmount(index) <= 0) {
            console.warn(`Amount of ${this.items[index]} is not greater than 0`);
            return;
        }
        if (!item.canConsume()) {
            console.warn("Cannot consume item, check its restrictions for the reason");
            return;
        }

        item.consume();
        this.loseItemAtIndex(index, 1);
    }


    /**
     * Remove items from this inventory, prefer an empty stack
     * Recursively calls itself if stacks are emptying
     * Returns the number of items that still need to be removed
     * @param id
     * @param amount
     */
    loseItemAmount(id: ItemId, amount: number = 1): number {
        // While we still need to remove and have items left
        while (amount > 0 && this.getTotalAmount(id) > 0) {
            const nonFullStackIndex = this.getIndexOfNonFullStack(id)
            const indexToUse = nonFullStackIndex !== -1 ? nonFullStackIndex : this.getIndexOfItem(id);
            if (indexToUse === -1) {
                throw Error(`Index of item ${id} to lose is -1. This suggests an error in inventory management`);
            }
            const amountToRemove = Math.min(amount, this.items[indexToUse].amount);
            amount -= amountToRemove;
            this.loseItemAtIndex(indexToUse, amountToRemove);

        }

        return amount;
    }

    /**
     * Add items to this inventory, prefer an existing stack
     * Recursively calls itself if stacks are overflowing
     * Returns the number of items that need to be added
     * @param id
     * @param amount
     */
    gainItem(id: ItemId, amount: number = 1): number {
        const item = ItemList.getItem(id);

        if (!this.acceptsType(item.type)) {
            return amount;
        }

        // Find stack and add to it or create a new one
        const nonFullStackIndex = this.getIndexOfNonFullStack(id);
        if (nonFullStackIndex === -1) {
            // Create a new stack
            const emptyIndex = this.getIndexOfFirstEmptySlot();
            if (emptyIndex === -1) {
                console.log(`Cannot add ${amount} of ${id}, no empty slots left`);
                return amount;
            }
            const amountToAdd = Math.min(amount, item.maxStack);
            this.items.splice(emptyIndex, 1, new InventoryItem(id, amountToAdd, item.maxStack));

            const amountLeft = amount - amountToAdd;
            if (amountLeft <= 0) {
                return 0;
            }
            return this.gainItem(id, amountLeft);
        } else {
            // Add to existing stack
            const amountToAdd = Math.min(amount, this.items[nonFullStackIndex].spaceLeft());

            this.items[nonFullStackIndex].gainItems(amountToAdd);
            const amountLeft = amount - amountToAdd;
            if (amountLeft <= 0) {
                return 0;
            }
            return this.gainItem(id, amountLeft);
        }
    }

    getSpotsLeftForItem(id: ItemId) {
        const item = ItemList.getItem(id);
        if (!this.acceptsType(item.type)) {
            return 0;
        }
        const maxStack = ItemList.getItem(id).maxStack;
        let total = 0;
        for (const item of this.items) {
            if (item.isEmpty()) {
                total += maxStack;
            } else if (item.id === id) {
                total += item.spaceLeft();
            }
        }
        return total;
    }

    canTakeItem(id: ItemId, amount: number) {
        return this.getSpotsLeftForItem(id) >= amount;
    }

    getIndexOfNonFullStack(id: ItemId) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id && !this.items[i].isFull()) {
                return i;
            }
        }
        return -1;
    }

    getIndexOfItem(id: ItemId) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    getIndexOfFirstEmptySlot(): number {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].isEmpty()) {
                return i;
            }
        }
        return -1;
    }

    hasEmptySlot(): boolean {
        return this.getIndexOfFirstEmptySlot() !== -1;
    }

    hasNonFullStack(id: ItemId): boolean {
        return this.getIndexOfNonFullStack(id) !== -1;
    }


    loseItemAtIndex(index: number, amount: number = 1) {
        this.items[index].amount -= amount;
        if (this.items[index].amount <= 0) {
            this.items.splice(index, 1, new InventoryItem(ItemId.Empty, 0, 0));
        }
    }

    dropStack(index: number) {
        this.loseItemAtIndex(index, this.items[index].amount);
    }

    getEmptySlotCount(): number {
        let count = 0;
        for (const item of this.items) {
            if (item.isEmpty()) {
                count++;
            }
        }
        return count;
    }


    getTotalAmount(id: ItemId): number {
        let total = 0;
        for (const item of this.items) {
            if (item.id === id) {
                total += item.amount;
            }
        }
        return total;
    }

    getAmount(index: number): number {
        return this.items[index].amount;
    }


    isEmpty(): boolean {
        for (const item of this.items) {
            if (item.amount != 0) {
                return false;
            }
        }
        return true;
    }

    acceptsType(type: ItemType): boolean {
        return this.acceptedTypes.includes(type) || type === ItemType.Empty;
    }
}
