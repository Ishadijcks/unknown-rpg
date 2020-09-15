import {Feature} from "@/game/Feature";
import {Skill} from "@/game/features/skills/Skill";
import {SkillsSaveData} from "@/game/features/skills/SkillsSaveData";
import {SkillType} from "@/game/features/skills/SkillType";

export class Skills extends Feature {
    name: string = "Skills";
    saveKey: string = "skills";
    skills: Skill[];

    constructor() {
        super();
        this.skills = [
            new Skill(SkillType.Fishing),
            new Skill(SkillType.Mining),
        ];
    }

    getSkill(type: SkillType): Skill | null {
        for (const skill of this.skills) {
            if (skill.type === type) {
                return skill;
            }
        }
        console.error(`Could not find skill of type ${type}`);
        return null;
    }

    load(data: SkillsSaveData): void {
        for (const key in data.list) {
            if (Object.prototype.hasOwnProperty.call(data.list, key)) {
                const type = key as SkillType;
                const skill = this.getSkill(type);
                if (skill != null) {
                    skill.exp = data.list[type];
                }
            }
        }
    }

    parseSaveData(json: Record<string, unknown>): SkillsSaveData {
        const data = new SkillsSaveData();
        const list = json.list as Record<SkillType, number>;
        for (const key in list) {
            if (Object.prototype.hasOwnProperty.call(list, key)) {
                data.addSkillData(key as SkillType, list[key as SkillType])
            }
        }

        return data;
    }

    save(): SkillsSaveData {
        const data = new SkillsSaveData();
        for (const skill of this.skills) {
            data.addSkillData(skill.type, skill.exp);
        }
        return data;
    }

}
