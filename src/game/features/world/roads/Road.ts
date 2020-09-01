import {WorldLocation} from "@/game/features/world/WorldLocation";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {Requirement} from "@/engine/requirements/Requirement";
import {RoadLocationIdentifier} from "@/game/features/world/roads/RoadLocationIdentifier";
import {PlayerAction} from "@/game/features/player/PlayerAction";

export class Road extends WorldLocation {
    from: WorldLocationIdentifier;
    to: WorldLocationIdentifier;
    baseDifficulty: number;


    constructor(identifier: RoadLocationIdentifier, displayName: string, from: WorldLocationIdentifier, to: WorldLocationIdentifier, baseDifficulty: number, possibleActions: PlayerAction[] = [], requirements: Requirement[] = []) {
        super(identifier, displayName, possibleActions, requirements);
        this.from = from;
        this.to = to;
        this.baseDifficulty = baseDifficulty;
    }
}
