import {Feature} from "@/game/Feature";
import {Fightable} from "@/game/features/combat/Fightable";
import {Attack} from "@/game/features/combat/Attack";
import {Weapon} from "@/game/features/combat/Weapon";
import {PlayerEquipmentSaveData} from "@/game/features/equipment/PlayerEquipmentSaveData";
import {WeaponType} from "@/game/features/combat/WeaponType";
import {EquipmentType} from "@/game/features/equipment/EquipmentType";
import {Equipment} from "@/game/features/equipment/Equipment";
import {App} from "@/App";
import {InventoryId} from "@/game/features/inventory/InventoryId";
import {InventoryItem} from "@/game/features/inventory/InventoryItem";

export class PlayerEquipment extends Feature implements Fightable {
    name: string = "Player Equipment";
    saveKey: string = "player-equipment";
    criticalChance: number = 0;
    dodgeChance: number = 0;
    mageAttack: number = 0;
    mageDefense: number = 0;
    meleeAttack: number = 0;
    meleeDefense: number = 0;
    rangeAttack: number = 0;
    rangeDefense: number = 0;

    maxHealth: number;
    health: number = 0;

    cooldown = 0;
    isAlive: boolean;

    equipment: Record<EquipmentType, Equipment | null> = {
        Shield: null,
        Weapon: null
    };


    constructor(maxHealth: number) {
        super();
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.isAlive = true;
    }

    attack(): Attack {
        const attack = (this.equipment[EquipmentType.Weapon] as Weapon)?.attacks[0] ?? new Attack("Punch", WeaponType.Melee, 1, 1, 3);
        this.cooldown = attack.cooldown;
        return attack;
    }

    idle(delta: number) {
        this.cooldown -= delta;
    }

    takeDamage(damage: number) {
        this.health -= damage;
        console.log(`Player taking damage, new health is ${this.health}`);
        if (this.health <= 0) {
            this.die();
        }
    }

    gainHealth(amount: number) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    die(): void {
        this.isAlive = false;
        console.log("Player is dead, that can't be good");
    }

    respawn(): void {
        console.log("Respawning player");
        this.health = this.maxHealth;
        this.isAlive = true;
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

    getEquippedItemForType(type: EquipmentType): Equipment | null {
        return this.equipment[type];
    }

    unEquip(type: EquipmentType, indexToPlaceInInventory = -1) {
        const equipment = this.equipment[type];
        if (equipment == null) {
            console.error(`Cannot unequip ${type} as it's already null`);
            return;
        }
        const id = equipment.id;

        if (id == null) {
            console.error(`Cannot unequip ${type} as id is null`);
            return
        }

        if (!App.game.playerInventory.canTakeItem(id, 1)) {
            console.error(`Cannot remove item ${id} because inventory is full`);
            return;
        }

        this.equipment[type] = null;
        if (indexToPlaceInInventory === -1) {
            App.game.playerInventory.gainItem(id);
        } else {
            App.game.playerInventory.getSubInventory(InventoryId.Main).items.splice(indexToPlaceInInventory, 1, new InventoryItem(id, 1));
        }
        this.recalculatePlayerStats();

    }

    equip(equipment: Equipment) {
        if (this.equipment[equipment.equipmentType] != null) {
            console.error(`Cannot equip ${equipment.name} as ${equipment.type} is not null`);
            return;
        }
        this.equipment[equipment.equipmentType] = equipment;
        this.recalculatePlayerStats();
    }

    recalculatePlayerStats() {
        this.criticalChance = 0;
        this.dodgeChance = 0;
        this.mageAttack = 0;
        this.mageDefense = 0;
        this.meleeAttack = 0;
        this.meleeDefense = 0;
        this.rangeAttack = 0;
        this.rangeDefense = 0;

        for (const type in this.equipment) {
            // if (!this.equipment.hasOwnProperty(type)) {
            //     continue;
            // }
            const equipment = this.equipment[type as EquipmentType] as Equipment;
            if (equipment == null) {
                continue;
            }
            this.criticalChance += equipment.criticalChance;
            this.dodgeChance += equipment.dodgeChance;
            this.mageAttack += equipment.mageAttack;
            this.mageDefense += equipment.mageDefense;
            this.meleeAttack += equipment.meleeAttack;
            this.meleeDefense += equipment.meleeDefense;
            this.rangeAttack += equipment.rangeAttack;
            this.rangeDefense += equipment.rangeDefense;
        }
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

    get equippedWeapon(): Weapon | null {
        return this.equipment[EquipmentType.Weapon] as Weapon;
    }
}
