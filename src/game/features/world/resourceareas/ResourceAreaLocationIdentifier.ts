import {WorldLocationType} from "@/game/features/world/WorldLocationType";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {ResourceAreaId} from "@/game/features/world/resourceareas/ResourceAreaId";

export class ResourceAreLocationIdentifier extends WorldLocationIdentifier {

    public constructor(id: ResourceAreaId) {
        super(WorldLocationType.ResourceArea, id)
    }
}
