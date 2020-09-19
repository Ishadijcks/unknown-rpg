import {CombatStats} from "@/game/features/combat/CombatStats";
import {EnemyId} from "@/game/features/combat/EnemyId";
import {EnemyCategory} from "@/game/features/combat/EnemyCategory";
import {Attack} from "@/game/features/combat/Attack";
import {Fightable} from "@/game/features/combat/Fightable";
import {Random} from "@/engine/probability/Random";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {WeaponType} from "@/game/features/combat/WeaponType";
import {LootTableId} from "@/engine/loot/LootTableId";

export abstract class Enemy implements Fightable {
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

    cooldown: number = 0;
    isAlive: boolean = true;

    loot: LootTableId | null;
    private _onDeath = new SimpleEventDispatcher<EnemyId>();


    protected constructor(id: EnemyId, categories: EnemyCategory[], maxHealth: number, stats: CombatStats, attacks: Attack[], loot: LootTableId) {
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

        this.loot = loot;
    }

    attack(): Attack {
        const attack = Random.fromArray(this.attacks);
        this.cooldown = attack.cooldown;
        return attack;
    }

    idle(delta: number) {
        this.cooldown -= delta;
    }

    takeDamage(damage: number) {
        this.health -= damage;
        if (this.health <= 0) {
            this.die();
        }
    }

    getAttackValue(type: WeaponType): number {
        switch (type) {
            case WeaponType.Melee:
                return this.meleeAttack;
            case WeaponType.Range:
                return this.rangeAttack;
            case WeaponType.Magic:
                return this.mageAttack;
        }
    }

    getDefenseValue(type: WeaponType): number {
        switch (type) {
            case WeaponType.Melee:
                return this.meleeDefense;
            case WeaponType.Range:
                return this.rangeDefense;
            case WeaponType.Magic:
                return this.mageDefense;
        }
    }

    die(): void {
        this.isAlive = false;
        this._onDeath.dispatch(this.id);
        console.log("Monster is dead, gain some loot :(");
    }

    abstract clone(): Enemy;

    public get onDeath(): ISimpleEvent<EnemyId> {
        return this._onDeath.asEvent();
    }
}
