import {DialogDecision} from "@/game/features/dialog/DialogDecision";
import {Dialog} from "@/game/features/dialog/Dialog";

export class DialogTree {
    dialog: Dialog[];
    decisions: DialogDecision[];


    constructor(dialog: Dialog[], decisions: DialogDecision[]) {
        this.dialog = dialog;
        this.decisions = decisions;
    }
}

