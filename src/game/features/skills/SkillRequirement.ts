import {Requirement} from "@/engine/requirements/Requirement";
import {SkillType} from "@/game/features/skills/SkillType";
import {App} from "@/App";

export class SkillRequirement extends Requirement {
    skill: SkillType;
    targetLevel: number;

    constructor(skill: SkillType, targetLevel: number) {
        super();
        this.skill = skill;
        this.targetLevel = targetLevel;
    }

    getActualValue(): number {
        const skill = App.game.skills.getSkill(this.skill);
        if (skill == null) {
            return -1;
        }
        return skill.getLevel();
    }

    getTargetValue(): number {
        return this.targetLevel;
    }

    lockedReason(): string {
        return `Reach level ${this.targetLevel} in ${this.skill}`;
    }

}
