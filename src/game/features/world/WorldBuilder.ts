import {World} from "@/game/features/world/World";
import {Road} from "@/game/features/world/roads/Road";
import {Town} from "@/game/features/world/towns/Town";
import {RoadLocationIdentifier} from "@/game/features/world/roads/RoadLocationIdentifier";
import {RoadId} from "@/game/features/world/roads/RoadId";
import {TownId} from "@/game/features/world/towns/TownId";
import {TownLocationIdentifier} from "@/game/features/world/towns/TownLocationIdentifier";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {Requirement} from "@/engine/requirements/Requirement";
import {TownTier} from "@/game/features/world/towns/TownTier";
import {PlayerAction} from "@/game/features/player/PlayerAction";
import {DummyAction2} from "@/game/features/player/DummyAction";
import {ResourceAreaId} from "@/game/features/world/resourceareas/ResourceAreaId";
import {ResourceArea} from "@/game/features/world/resourceareas/ResourceArea";
import {ResourceAreLocationIdentifier} from "@/game/features/world/resourceareas/ResourceAreaLocationIdentifier";
import {WeightedDistribution} from "@/engine/probability/WeightedDistribution";
import {Outcome} from "@/engine/probability/Outcome";
import {MultiAction} from "@/game/features/player/MultiAction";
import {RecipeAction} from "@/game/features/recipes/RecipeAction";
import {RecipeList} from "@/game/features/recipes/RecipeList";
import {RecipeId} from "@/game/features/recipes/RecipeId";

export class WorldBuilder {

    static createWorld(): World {
        const roads = [
            this.createRoad(RoadId.OldTownRoad, "Old Town Road", new TownLocationIdentifier(TownId.SmallTown), new TownLocationIdentifier(TownId.ToonTown), 50),
            this.createRoad(RoadId.ToonToAwesome, "Toon to Awesome", new TownLocationIdentifier(TownId.ToonTown), new TownLocationIdentifier(TownId.AwesomeTown), 60),
            this.createRoad(RoadId.AwesomeToLake1, "Awesome to Lake1", new TownLocationIdentifier(TownId.AwesomeTown), new ResourceAreLocationIdentifier(ResourceAreaId.Lake1), 70),
        ];

        const towns = [
            this.createTown(TownId.ToonTown, "Toon Town", TownTier.Town,
                [
                    new DummyAction2("Get a magic potion in Toon Town", new TownLocationIdentifier(TownId.ToonTown), 1, 10)
                ]),
            this.createTown(TownId.SmallTown, "Small Town", TownTier.Town),
            this.createTown(TownId.AwesomeTown, "Awesome Town", TownTier.Town),
        ];

        const resourceAreas = [
            this.createResourceArea(ResourceAreaId.Lake1, "This is a lake", [
                new MultiAction(
                    "Explore the Lake",
                    new ResourceAreLocationIdentifier(ResourceAreaId.Lake1),
                    new WeightedDistribution([
                        new Outcome(new RecipeAction("Fish 1", new ResourceAreLocationIdentifier(ResourceAreaId.Lake1), RecipeList.getRecipe(RecipeId.Fishing1), 10), 0.9),
                    ]),
                    100
                ),
                new RecipeAction("Cook 1", new ResourceAreLocationIdentifier(ResourceAreaId.Lake1), RecipeList.getRecipe(RecipeId.Cooking1), 100),
                new MultiAction(
                    "Mine",
                    new ResourceAreLocationIdentifier(ResourceAreaId.Lake1),
                    new WeightedDistribution([
                        new Outcome(new RecipeAction("Mining 1", new ResourceAreLocationIdentifier(ResourceAreaId.Lake1), RecipeList.getRecipe(RecipeId.Mining1), 1), 0.5),
                        new Outcome(new RecipeAction("Mining 2", new ResourceAreLocationIdentifier(ResourceAreaId.Lake1), RecipeList.getRecipe(RecipeId.Mining2), 1), 0.5),
                    ]),
                    100
                ),
                new RecipeAction("Smith bars (ore 1 & 2)", new ResourceAreLocationIdentifier(ResourceAreaId.Lake1), RecipeList.getRecipe(RecipeId.Smithing1), 10),
                new RecipeAction("Smith sword (5 bars)", new ResourceAreLocationIdentifier(ResourceAreaId.Lake1), RecipeList.getRecipe(RecipeId.SmithSword), 0),

            ]),
        ]

        return new World(roads, towns, resourceAreas);
    }

    static createRoad(id: RoadId, displayName: string, from: WorldLocationIdentifier, to: WorldLocationIdentifier, baseDifficulty: number, possibleActions: PlayerAction[] = [], requirements: Requirement[] = []): Road {
        return new Road(new RoadLocationIdentifier(id), displayName, from, to, baseDifficulty, possibleActions, requirements);
    }

    static createTown(id: TownId, displayName: string, tier: TownTier, possibleActions: PlayerAction[] = [], requirements: Requirement[] = []): Town {
        return new Town(new TownLocationIdentifier(id), displayName, tier, possibleActions, requirements);
    }

    static createResourceArea(id: ResourceAreaId, displayName: string, possibleActions: PlayerAction[] = [], requirements: Requirement[] = []): ResourceArea {
        return new ResourceArea(new ResourceAreLocationIdentifier(id), displayName, possibleActions, requirements);
    }
}
