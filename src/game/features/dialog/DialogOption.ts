import {DialogId} from "@/game/features/dialog/DialogId";
import {Requirement} from "@/engine/requirements/Requirement";

export class DialogOption {
    label: string;
    reference: DialogId;
    requirements: Requirement[];

    constructor(label: string, reference: DialogId, requirements: Requirement[] = []) {
        this.label = label;
        this.reference = reference;
        this.requirements = requirements;
    }

    canAccess(): boolean {
        for (const req of this.requirements) {
            if (!req.isCompleted()) {
                return false;
            }
        }
        return true;
    }
}
