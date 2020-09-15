import {SkillType} from "@/game/features/skills/SkillType";
import {Progress} from "@/engine/requirements/Progress";


export class Skill {
    readonly EXP_TO_LEVEL = [0, 100, 250, 500, 1000, Infinity]

    type: SkillType;
    exp: number;


    constructor(type: SkillType) {
        this.type = type;
        this.exp = 0;
    }

    getLevel(): number {
        for (let i = 0; i < this.EXP_TO_LEVEL.length; i++) {
            if (this.exp < this.EXP_TO_LEVEL[i]) {
                return i;
            }
        }
        console.error(`Could not calculate level for skill ${this.type} with exp ${this.exp}`);
        return -1;
    }

    getLevelProgress(): Progress {
        const level = this.getLevel();
        const expForNextLevel = this.getExpForNextLevel(level);
        const alreadyGainedExp = this.exp - this.EXP_TO_LEVEL[level - 1];
        return new Progress(alreadyGainedExp, expForNextLevel);
    }

    getExpForNextLevel(level: number) {
        return this.EXP_TO_LEVEL[level] - this.EXP_TO_LEVEL[level - 1];
    }

}
