import {SaveData} from "@/engine/saving/SaveData";
import {SkillType} from "@/game/features/skills/SkillType";

export class SkillsSaveData extends SaveData {
    list: Record<SkillType, number>;

    constructor() {
        super();
        this.list = {} as Record<SkillType, number>;
    }

    addSkillData(key: SkillType, exp: number): void {
        this.list[key] = exp;
    }
}
