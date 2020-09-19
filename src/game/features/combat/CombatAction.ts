import {PlayerAction} from "@/game/features/player/PlayerAction";
import {Combat} from "@/game/features/combat/Combat";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {Enemy} from "@/game/features/combat/Enemy";
import {App} from "@/App";
import {LootTableList} from "@/engine/loot/LootTableList";

export class CombatAction extends PlayerAction {
    combat: Combat;
    enemy: Enemy;

    constructor(description: string, location: WorldLocationIdentifier, enemy: Enemy, repeat: number) {
        super(description, location, Infinity, repeat);
        this.enemy = enemy.clone();

        // Placeholder
        this.combat = new Combat(this.enemy, this.enemy);
    }


    start(): boolean {
        const couldStart = super.start();
        if (couldStart) {
            this.combat = new Combat(App.game.equipment, this.enemy);
        }
        return couldStart;
    }

    perform(delta: number) {
        if (!this.isStarted || this.isFinished) {
            return;
        }

        this.combat.tick(delta);

        this.description = `Fight: ${this.combat.fighter1.health} / ${this.combat.fighter1.maxHealth} vs ${this.enemy.id} ${this.combat.fighter2.health} / ${this.combat.fighter2.maxHealth}`;
        if (!this.combat.isActive) {
            this.complete();
        }
    }

    clone(): CombatAction {
        return new CombatAction(this.description, this.location, this.enemy, this.repeat);
    }

    gainReward(): boolean {
        if(!this.combat.fighter1.isAlive) {
            App.game.equipment.respawn();
            return false;
        }
        console.log("Gain reward");
        if(this.enemy.loot){
            const loot = LootTableList.roll(this.enemy.loot)
            App.game.playerInventory.gainItemAmounts(loot);
        }
        return true;
    }

}
