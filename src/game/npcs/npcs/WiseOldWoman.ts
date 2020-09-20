import {Npc} from "@/game/npcs/Npc";
import {NpcId} from "@/game/npcs/NpcId";
import {DialogTree} from "@/game/features/dialog/DialogTree";
import {Dialog} from "@/game/features/dialog/Dialog";
import {DialogId} from "@/game/features/dialog/DialogId";
import {DialogText} from "@/game/features/dialog/DialogText";
import {DialogDecisionId} from "@/game/features/dialog/DialogDecisionId";
import {DialogDecision} from "@/game/features/dialog/DialogDecision";
import {DialogOption} from "@/game/features/dialog/DialogOption";
import {SkillRequirement} from "@/game/features/skills/SkillRequirement";
import {SkillType} from "@/game/features/skills/SkillType";

export class WiseOldWoman extends Npc {

    constructor() {
        super(NpcId.WiseOldWoman, new DialogTree(
            [
                new Dialog(
                    DialogId.WiseOldWomanIntro,
                    [new DialogText(NpcId.Player, "Hi"), new DialogText(NpcId.WiseOldWoman, "Hello young man, would you like a bagel?")],
                    DialogDecisionId.WiseOldWomanQuestion
                ),
                new Dialog(
                    DialogId.WiseOldWomanYesBagel,
                    [new DialogText(NpcId.Player, "Yes please"), new DialogText(NpcId.WiseOldWoman, "Here it is", function () {
                        console.log("Here is a bagel")
                    })],
                ),
                new Dialog(
                    DialogId.WiseOldWomanNoBagel,
                    [
                        new DialogText(NpcId.Player, "No thanks, cutting down on carbs"),
                        new DialogText(NpcId.WiseOldWoman, "Are you sure?"),
                        new DialogText(NpcId.Player, "Yes"),
                        new DialogText(NpcId.WiseOldWoman, "Are you sure?"),
                        new DialogText(NpcId.Player, "Yes?"),
                        new DialogText(NpcId.WiseOldWoman, "I'll ask one more time?"),
                    ],
                    DialogDecisionId.WiseOldWomanQuestion,
                ),
            ],
            [
                new DialogDecision(DialogDecisionId.WiseOldWomanQuestion, [
                    new DialogOption("Yes", DialogId.WiseOldWomanYesBagel),
                    new DialogOption("Yuck no", DialogId.WiseOldWomanNoBagel),
                    new DialogOption("I'll make them myself (3 cooking)", DialogId.WiseOldWomanBragAboutCooking, [new SkillRequirement(SkillType.Cooking, 3)]),
                ])
            ],
            DialogId.WiseOldWomanIntro
        ));
    }
}
