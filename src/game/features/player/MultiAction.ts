import {PlayerAction} from "@/game/features/player/PlayerAction";
import {WorldLocationIdentifier} from "@/game/features/world/WorldLocationIdentifier";
import {WeightedDistribution} from "@/engine/probability/WeightedDistribution";
import {Outcome} from "@/engine/probability/Outcome";

export class MultiAction extends PlayerAction {
    activeAction: PlayerAction;
    possibleActions: WeightedDistribution<PlayerAction>;

    constructor(description: string, location: WorldLocationIdentifier, possibleActions: WeightedDistribution<PlayerAction>, repeat: number) {
        super(description, location, 0, repeat);
        this.possibleActions = possibleActions;

        // Will be overwritten by the randomizeAction()
        this.activeAction = this.possibleActions.draw();

        this.randomizeAction();
    }

    selectAction(action: PlayerAction) {
        this.activeAction = action;
        this.duration = action.duration;
    }

    randomizeAction() {
        this.selectAction(this.possibleActions.draw());
    }


    repeatAction() {
        this.randomizeAction();
        super.repeatAction();
    }

    gainReward(): boolean {
        return this.activeAction.gainReward();
    }

    public getScheduleDescription(): string {
        return this.description
    }

    public getActiveDescription(): string {
        return `${this.description} ${this.activeAction.getActiveDescription()}`;
    }

    clone(): MultiAction {
        const distribution = new WeightedDistribution<PlayerAction>();
        for (const outcome of this.possibleActions.outcomes) {
            distribution.addOutcome(new Outcome<PlayerAction>(outcome.item.clone(), outcome.weight));
        }
        return new MultiAction(this.description, this.location, distribution, this.repeat);
    }
}
