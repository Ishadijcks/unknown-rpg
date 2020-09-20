import {DialogTree} from "@/game/features/dialog/DialogTree";
import {DialogDecision} from "@/game/features/dialog/DialogDecision";
import {Dialog} from "@/game/features/dialog/Dialog";
import {DialogId} from "@/game/features/dialog/DialogId";
import {DialogDecisionId} from "@/game/features/dialog/DialogDecisionId";

export enum DialogType {
    None,
    Decision,
    Dialog
}

export class DialogHandler {
    public tree: DialogTree;

    public type: DialogType = DialogType.None;

    public decision: DialogDecision | null = null;
    public dialog: Dialog | null = null;


    constructor(tree: DialogTree) {
        this.tree = tree;
    }

    public start() {
        const root = this.tree.getRoot();

        // If we only have 1 option we can skip the root
        if (root.options.length === 1) {
            this.setDialog(root.options[0].reference);
        } else {
            this.setRoot(root);
        }
    }

    public next() {
        if (this.dialog == null) {
            console.warn("Could not go next if dialog is null");
            return;
        }
        this.dialog.next();

        if (this.dialog.isAtEnd()) {
            if (this.dialog.destination == undefined) {
                this.end();
            } else {
                this.setDecision(this.dialog.destination)
            }
        }
    }

    public selectOption(index: number) {
        if (this.decision == null) {
            console.warn("Could select option if decision is null");
            return;
        }
        if (index >= this.decision.options.length) {
            console.warn(`Current decision does not have index ${index}, only ${this.decision.options.length} options`);
            return;
        }

        this.setDialog(this.decision.options[index].reference);
    }

    private setDialog(id: DialogId) {
        this.type = DialogType.Dialog;
        this.decision = null;
        this.dialog = this.tree.getDialog(id);
    }

    private setRoot(root: DialogDecision) {
        this.type = DialogType.Decision;
        this.dialog = null;
        this.decision = root;
    }

    private setDecision(id: DialogDecisionId) {
        this.type = DialogType.Decision;
        this.dialog = null;
        this.decision = this.tree.getDecision(id);
    }

    private end() {
        this.type = DialogType.None;
        this.dialog = null;
        this.decision = null;
    }
}
