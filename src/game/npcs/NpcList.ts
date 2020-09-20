import {NpcId} from "@/game/npcs/NpcId";
import {Npc} from "@/game/npcs/Npc";
import {WiseOldWoman} from "@/game/npcs/npcs/WiseOldWoman";

export class NpcList {
    static npcs: Record<NpcId, Npc> = {} as Record<NpcId, Npc>;

    static initialize() {
        this.registerNpc(new WiseOldWoman());
    }

    static registerNpc(npc: Npc) {
        this.npcs[npc.id] = npc;
    }

    static getNpc(id: NpcId): Npc {
        if (this.npcs[id] == null) {
            console.error(`Could not find Npc with id ${id}`);
        }
        return this.npcs[id];
    }
}
