import {CombatStats} from "@/game/features/combat/CombatStats";
import {Attack} from "@/game/features/combat/Attack";

/**
 * Anything that can engage in combat.
 * Usually the player or enemies
 */
export interface Fightable extends CombatStats {
    maxHealth: number;
    health: number;
    attacks: Attack[];


    attack(): void;

    die(): void;
}