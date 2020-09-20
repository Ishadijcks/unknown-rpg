import {DialogId} from "@/game/features/dialog/DialogId";
import {DialogDecisionId} from "@/game/features/dialog/DialogDecisionId";
import {DialogOption} from "@/game/features/dialog/DialogOption";


export class DialogDecision {
    id: DialogDecisionId;
    options: DialogOption[]


    constructor(id: DialogDecisionId, options: DialogOption[]) {
        this.id = id;
        this.options = options;
    }
}
