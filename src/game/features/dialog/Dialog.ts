import {DialogText} from "@/game/features/dialog/DialogText";
import {DialogId} from "@/game/features/dialog/DialogId";
import {DialogDecisionId} from "@/game/features/dialog/DialogDecisionId";


export class Dialog {
    id: DialogId;
    dialog: DialogText[];

    currentIndex: number = 0;

    destination?: DialogDecisionId;


    constructor(id: DialogId, dialog: DialogText[], destination?: DialogDecisionId) {
        this.id = id;
        this.dialog = dialog;
        this.destination = destination;
    }

    reset() {
        this.currentIndex = 0;
    }
}
