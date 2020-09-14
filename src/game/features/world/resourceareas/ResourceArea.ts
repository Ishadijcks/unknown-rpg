import {WorldLocation} from "@/game/features/world/WorldLocation";
import {ResourceAreLocationIdentifier} from "@/game/features/world/resourceareas/ResourceAreaLocationIdentifier";
import {Requirement} from "@/engine/requirements/Requirement";
import {PlayerAction} from "@/game/features/player/PlayerAction";

export class ResourceArea extends WorldLocation {
    // tier:

    constructor(identifier: ResourceAreLocationIdentifier, displayName: string, possibleActions: PlayerAction[], requirements: Requirement[]) {
        super(identifier, displayName, possibleActions, requirements);
    }
}
