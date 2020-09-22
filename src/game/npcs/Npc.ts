import {NpcId} from "@/game/npcs/NpcId";
import {DialogTree} from "@/game/features/dialog/DialogTree";

export class Npc {
    id: NpcId;
    dialog: DialogTree;

    constructor(id: NpcId, dialog: DialogTree) {
        this.id = id;
        this.dialog = dialog;
    }
}
