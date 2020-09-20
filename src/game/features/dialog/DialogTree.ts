import {DialogDecision} from "@/game/features/dialog/DialogDecision";
import {Dialog} from "@/game/features/dialog/Dialog";
import {DialogId} from "@/game/features/dialog/DialogId";
import {DialogDecisionId} from "@/game/features/dialog/DialogDecisionId";
import {DialogOption} from "@/game/features/dialog/DialogOption";

export class DialogTree {
    dialog: Dialog[];
    decisions: DialogDecision[];
    private readonly firstDialog: DialogId;

    constructor(dialog: Dialog[], decisions: DialogDecision[], firstDialog: DialogId) {
        this.dialog = dialog;
        this.decisions = decisions;
        this.firstDialog = firstDialog;
    }


    getRoot() {
        return new DialogDecision(DialogDecisionId.Root, [new DialogOption("Talk about something else", this.firstDialog)]);
    }

    getDialog(id: DialogId) {
        return this.dialog.find(value => value.id === id) ?? null;
    }

    getDecision(id: DialogDecisionId) {
        return this.decisions.find(value => value.id === id) ?? null;
    }
}

