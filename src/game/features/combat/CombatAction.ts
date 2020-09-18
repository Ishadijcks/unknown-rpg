import {PlayerAction} from "@/game/features/player/PlayerAction";
import {Combat} from "@/game/features/combat/Combat";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {Enemy} from "@/game/features/combat/Enemy";
import {App} from "@/App";

export class CombatAction extends PlayerAction {
    combat: Combat;
    enemy: Enemy;

    constructor(description: string, location: WorldLocationIdentifier, enemy: Enemy, repeat: number) {
        super(description, location, Infinity, repeat);
        this.enemy = enemy;

        // Placeholder
        this.combat = new Combat(enemy, enemy);
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

        if (!this.combat.isActive) {
            this.complete();
        }
    }

    clone(): CombatAction {
        return new CombatAction(this.description, this.location, this.enemy, this.repeat);
    }

    gainReward(): boolean {
        console.log("Gain reward");
        return true;
    }

}
