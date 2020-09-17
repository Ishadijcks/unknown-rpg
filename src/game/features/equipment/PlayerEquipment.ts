import {Feature} from "@/game/Feature";
import {Fightable} from "@/game/features/combat/Fightable";
import {Attack} from "@/game/features/combat/Attack";
import {Weapon} from "@/game/features/combat/Weapon";
import {PlayerEquipmentSaveData} from "@/game/features/equipment/PlayerEquipmentSaveData";
import {WeaponType} from "@/game/features/combat/WeaponType";

export class PlayerEquipment extends Feature implements Fightable {
    name: string = "Player Equipment";
    saveKey: string = "player-equipment";
    criticalChance: number = 0;
    dodgeChance: number = 0;
    health: number = 0;
    mageAttack: number = 0;
    mageDefense: number = 0;
    maxHealth: number = 0;
    meleeAttack: number = 0;
    meleeDefense: number = 0;
    rangeAttack: number = 0;
    rangeDefense: number = 0;


    equippedWeapon: Weapon | null = null;
    // equippedShield: Shield;

    attack(): Attack {
        return this.equippedWeapon?.attacks[0] ?? new Attack(WeaponType.Melee, 1, 3);
    }

    die(): void {
        console.log("Player is dead, that can't be good");
    }

    load(data: PlayerEquipmentSaveData): void {
        // Empty
    }

    parseSaveData(json: Record<string, unknown>): PlayerEquipmentSaveData {
        return new PlayerEquipmentSaveData();
    }

    save(): PlayerEquipmentSaveData {
        return new PlayerEquipmentSaveData();
    }

}
