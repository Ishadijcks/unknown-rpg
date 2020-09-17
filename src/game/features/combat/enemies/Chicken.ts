import {Enemy} from "@/game/features/combat/Enemy";
import {EnemyId} from "@/game/features/combat/EnemyId";
import {EnemyCategory} from "@/game/features/combat/EnemyCategory";
import {Attack} from "@/game/features/combat/Attack";
import {WeaponType} from "@/game/features/combat/WeaponType";

export class Chicken extends Enemy {

    constructor() {
        super(EnemyId.Chicken, [EnemyCategory.Birds], 100, {
            meleeAttack: 10,
            meleeDefense: 3,
            rangeAttack: 0,
            rangeDefense: 0,
            mageDefense: 0,
            mageAttack: 0,
            criticalChance: 0,
            dodgeChance: 0,
        }, [
            new Attack(WeaponType.Melee, 5, 10),
        ]);
    }
}