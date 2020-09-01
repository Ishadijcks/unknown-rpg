import {WorldLocationType} from "@/game/features/world/WorldLocationType";
import {RoadId} from "@/game/features/world/roads/RoadId";
import {TownId} from "@/game/features/world/towns/TownId";
import {ResourceAreaId} from "@/game/features/world/resourceareas/ResourceAreaId";

export abstract class WorldLocationIdentifier {
    type: WorldLocationType;
    id: RoadId | TownId | ResourceAreaId;

    protected constructor(type: WorldLocationType, id: RoadId | TownId | ResourceAreaId) {
        this.type = type;
        this.id = id;
    }

    public toString(): string {
        return `${WorldLocationType[this.type]}: ${this.id};`
    }

    public equals(other: WorldLocationIdentifier): boolean {
        if (other == null) {
            console.warn(`Comparing ${this.toString()} to null`);
            return false;
        }
        return this.type === other.type && this.id == other.id;
    }
}
