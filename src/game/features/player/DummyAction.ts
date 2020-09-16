import {PlayerAction} from "@/game/features/player/PlayerAction";
import {App} from "@/App";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {ItemId} from "@/game/items/ItemId";

export class DummyAction extends PlayerAction {

    constructor(description: string, location: WorldLocationIdentifier, duration: number, repeat: number) {
        super(description, location, duration, repeat);
    }

    gainReward(): boolean {
        App.game.wallet.gainMoney(1);
        const couldAdd: boolean = App.game.playerInventory.gainItem(ItemId.Fish1, Math.floor(Math.random() * 0 + 1));
        return couldAdd;
    }

    clone(): DummyAction {
        return new DummyAction(this.description, this.location, this.duration, this.repeat);
    }

}

export class DummyAction2 extends PlayerAction {

    constructor(description: string, location: WorldLocationIdentifier, duration: number, repeat: number) {
        super(description, location, duration, repeat);
    }

    gainReward(): boolean {
        App.game.wallet.gainMoney(1);
        const couldAdd: boolean = App.game.playerInventory.gainItem(ItemId.MoneyPotion);
        return couldAdd;
    }

    clone(): DummyAction2 {
        return new DummyAction2(this.description, this.location, this.duration, this.repeat);
    }
}
