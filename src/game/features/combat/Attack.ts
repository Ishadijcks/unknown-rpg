import {WeaponType} from "@/game/features/combat/WeaponType";

export class Attack {
    description: string;
    weaponType: WeaponType;
    minAttack: number;
    maxAttack: number;


    constructor(description: string, weaponType: WeaponType, minAttack: number, maxAttack: number) {
        this.description = description;
        this.weaponType = weaponType;
        this.minAttack = minAttack;
        this.maxAttack = maxAttack;
    }
}
