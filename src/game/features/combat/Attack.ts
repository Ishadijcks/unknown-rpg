import {WeaponType} from "@/game/features/combat/WeaponType";

export class Attack {
    weaponType: WeaponType;
    minAttack: number;
    maxAttack: number;


    constructor(weaponType: WeaponType, minAttack: number, maxAttack: number) {
        this.weaponType = weaponType;
        this.minAttack = minAttack;
        this.maxAttack = maxAttack;
    }
}
