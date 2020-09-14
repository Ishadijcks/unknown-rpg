import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {Requirement} from "@/engine/requirements/Requirement";
import {PlayerAction} from "@/game/features/player/PlayerAction";

export abstract class WorldLocation {
    identifier: WorldLocationIdentifier
    displayName: string;

    possibleActions: PlayerAction[]
    requirements: Requirement[]

    protected constructor(identifier: WorldLocationIdentifier, displayName: string, possibleActions: PlayerAction[] = [], requirements: Requirement[] = []) {
        this.identifier = identifier;
        this.displayName = displayName;
        this.possibleActions = possibleActions
        this.requirements = requirements;
    }

    canAccess(): boolean {
        for (const requirement of this.requirements) {
            if (!requirement.isCompleted()) {
                return false;
            }
        }
        return true;

    }

    getLockedReason(): string[] {
        const list = [];
        for (const requirement of this.requirements) {
            if (!requirement.isCompleted()) {
                list.push(requirement.lockedReason());
            }
        }
        return list;
    }
}
