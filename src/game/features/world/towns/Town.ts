import {WorldLocation} from "@/game/features/world/WorldLocation";
import {TownTier} from "@/game/features/world/towns/TownTier";
import {Requirement} from "@/engine/requirements/Requirement";
import {TownLocationIdentifier} from "@/game/features/world/towns/TownLocationIdentifier";
import {PlayerAction} from "@/game/features/player/PlayerAction";

export class Town extends WorldLocation {
    tier: TownTier;


    constructor(identifier: TownLocationIdentifier, displayName: string, tier: TownTier, possibleActions: PlayerAction[] = [], requirements: Requirement[] = []) {
        super(identifier, displayName, possibleActions, requirements);
        this.tier = tier;
    }
}
