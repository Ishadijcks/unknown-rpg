import {Enemy} from "@/game/features/combat/Enemy";
import {EnemyId} from "@/game/features/combat/EnemyId";
import {EnemyCategory} from "@/game/features/combat/EnemyCategory";
import {Attack} from "@/game/features/combat/Attack";
import {WeaponType} from "@/game/features/combat/WeaponType";

export class Chicken extends Enemy {

    constructor() {
        super(EnemyId.Chicken, [EnemyCategory.Birds], 20, {
            meleeAttack: 10,
            meleeDefense: 10,
            rangeAttack: 0,
            rangeDefense: 0,
            mageDefense: 0,
            mageAttack: 0,
            criticalChance: 0,
            dodgeChance: 0,
        }, [
            new Attack("Peck", WeaponType.Melee, 0.7, 5, 10),
        ]);
    }


    clone(): Chicken {
        return new Chicken();
    }
}
