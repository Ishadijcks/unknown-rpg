import {NpcId} from "@/game/npcs/NpcId";

export class DialogText {
    speaker: NpcId;
    text: string;

    afterRead?: Function;

    constructor(speaker: NpcId, text: string, afterRead?: Function) {
        this.speaker = speaker;
        this.text = text;
        this.afterRead = afterRead;
    }

}
