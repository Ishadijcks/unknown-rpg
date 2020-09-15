import {SkillType} from "@/game/features/skills/SkillType";

export class Experience {
    type: SkillType;
    amount: number;

    constructor(type: SkillType, amount: number) {
        this.type = type;
        this.amount = amount;
    }

    public toString(): string {
        return `${this.type} - ${this.amount}`;
    }
}
