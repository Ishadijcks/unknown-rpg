import {CombatStats} from "@/game/features/combat/CombatStats";
import {Attack} from "@/game/features/combat/Attack";
import {WeaponType} from "@/game/features/combat/WeaponType";

/**
 * Anything that can engage in combat.
 * Usually the player or enemies
 */
export interface Fightable extends CombatStats {
    maxHealth: number;
    health: number;
    cooldown: number;
    isAlive: boolean;

    meleeAttack: number;
    meleeDefense: number;

    rangeAttack: number;
    rangeDefense: number;

    mageDefense: number;
    mageAttack: number;

    criticalChance: number;
    dodgeChance: number;

    attack(): Attack;

    takeDamage(damage: number): void;

    idle(delta: number): void;

    getAttackValue(type: WeaponType): number;
    getDefenseValue(type: WeaponType): number;

    die(): void;
}
