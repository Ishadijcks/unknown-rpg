import {CombatStats} from "@/game/features/combat/CombatStats";
import {EnemyId} from "@/game/features/combat/EnemyId";
import {EnemyCategory} from "@/game/features/combat/EnemyCategory";
import {Attack} from "@/game/features/combat/Attack";
import {Fightable} from "@/game/features/combat/Fightable";
import {Random} from "@/engine/probability/Random";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";

export class Enemy implements Fightable {
    id: EnemyId;
    categories: EnemyCategory[];

    health: number;
    maxHealth: number;

    attacks: Attack[];

    // Stats
    criticalChance: number;
    dodgeChance: number;
    mageAttack: number;
    mageDefense: number;
    meleeAttack: number;
    meleeDefense: number;
    rangeAttack: number;
    rangeDefense: number;

    private _onDeath = new SimpleEventDispatcher<EnemyId>();


    constructor(id: EnemyId, categories: EnemyCategory[], maxHealth: number, stats: CombatStats, attacks: Attack[]) {
        this.id = id;
        this.categories = categories;
        this.maxHealth = maxHealth;
        this.health = maxHealth;

        this.attacks = attacks;

        this.criticalChance = stats.criticalChance ?? 0;
        this.dodgeChance = stats.dodgeChance ?? 0;
        this.mageAttack = stats.mageAttack ?? 0;
        this.mageDefense = stats.mageDefense ?? 0;
        this.meleeAttack = stats.meleeAttack ?? 0;
        this.meleeDefense = stats.meleeDefense ?? 0;
        this.rangeAttack = stats.rangeAttack ?? 0;
        this.rangeDefense = stats.rangeDefense ?? 0;
    }

    attack(): Attack {
        return Random.fromArray(this.attacks);
    }

    die(): void {
        this._onDeath.dispatch(this.id);
        console.log("Monster is dead, gain some loot :(");
    }

    public get onDeath(): ISimpleEvent<number> {
        return this._onDeath.asEvent();
    }
}
