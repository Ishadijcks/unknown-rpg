import {Feature} from "@/game/Feature";
import {Skill} from "@/game/features/skills/Skill";
import {SkillsSaveData} from "@/game/features/skills/SkillsSaveData";
import {SkillType} from "@/game/features/skills/SkillType";
import {Experience} from "@/game/features/skills/Experience";
import {Recipe} from "@/game/features/recipes/Recipe";
import {RecipeId} from "@/game/features/recipes/RecipeId";
import {ItemAmount} from "@/game/items/ItemAmount";
import {ItemId} from "@/game/items/ItemId";

export class Skills extends Feature {
    name: string = "Skills";
    saveKey: string = "skills";
    skills: Skill[];

    constructor() {
        super();
        this.skills = [
            // Mining
            new Skill(SkillType.Mining, [
                new Recipe(RecipeId.Mining1, 1, [], [new ItemAmount(ItemId.Ore1)], new Experience(SkillType.Mining, 10), []),
                new Recipe(RecipeId.Mining2, 1, [], [new ItemAmount(ItemId.Ore2)], new Experience(SkillType.Mining, 10), []),
            ]),


            // Smithing
            new Skill(SkillType.Smithing, [
                new Recipe(RecipeId.Smithing1, 1, [new ItemAmount(ItemId.Ore1), new ItemAmount(ItemId.Ore2)], [new ItemAmount(ItemId.Bar1)], new Experience(SkillType.Smithing, 10), []),
                new Recipe(RecipeId.SmithSword, 1, [new ItemAmount(ItemId.Bar1, 5)], [new ItemAmount(ItemId.SomeSword, 1)], new Experience(SkillType.Smithing, 50), []),
            ]),


            // Fishing
            new Skill(SkillType.Fishing, [
                new Recipe(RecipeId.Fishing1, 1, [], [new ItemAmount(ItemId.Fish1)], new Experience(SkillType.Fishing, 10), []),
            ]),


            // Cooking
            new Skill(SkillType.Cooking, [
                new Recipe(RecipeId.Cooking1, 1, [new ItemAmount(ItemId.Fish1)], [new ItemAmount(ItemId.CookedFish1)], new Experience(SkillType.Cooking, 10), []),
            ]),
        ];
    }

    gainExperience(experience: Experience) {
        const skill = this.getSkill(experience.type);
        if (skill == null) {
            throw Error(`Cannot find skill with type ${experience.type}`);
        }
        skill.gainExperience(experience);
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
