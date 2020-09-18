import {Fightable} from "@/game/features/combat/Fightable";
import {Attack} from "@/game/features/combat/Attack";
import {Random} from "@/engine/probability/Random";

export class Combat {
    fighter1: Fightable;
    fighter2: Fightable;

    isActive: boolean = true;

    constructor(fighter1: Fightable, fighter2: Fightable) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
    }

    tick(delta: number) {
        this.fighter1.idle(delta);
        this.fighter2.idle(delta);

        if (this.fighter1.cooldown <= 0) {
            const attack = this.fighter1.attack();
            const damage = this.calculateDamage(this.fighter1, attack, this.fighter2);
            console.log(`Player attacking monster for ${damage} damage`);
            this.fighter2.takeDamage(damage);
            if (!this.fighter2.isAlive) {
                this.end();
                return;
            }
        }
        if (this.fighter2.cooldown <= 0) {
            const attack = this.fighter2.attack();
            const damage = this.calculateDamage(this.fighter2, attack, this.fighter1);
            console.log(`Monster attacking player for ${damage} damage`);

            this.fighter1.takeDamage(damage);

            if (!this.fighter1.isAlive) {
                this.end();
                return;
            }
        }
    }

    calculateDamage(attacker: Fightable, attack: Attack, defender: Fightable): number {
        const isDodged = Random.booleanWithProbability(defender.dodgeChance)
        if (isDodged) {
            return 0;
        }
        const isCritical = Random.booleanWithProbability(attacker.criticalChance);
        const attackType = attack.weaponType;
        const attackStat = attacker.getAttackValue(attackType) + Random.intBetween(attack.minAttack, attack.maxAttack);
        const defenseStat = defender.getDefenseValue(attackType);

        const baseDamage = attackStat * 100 / (100 + defenseStat);
        return Math.ceil(baseDamage * (isCritical ? 2 : 1));
    }

    end(): void {
        this.isActive = false;
    }


}
