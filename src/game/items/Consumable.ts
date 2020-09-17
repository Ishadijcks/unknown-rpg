export interface Consumable {
    canConsume(): boolean;

    label: string;

    consume(): void;
}

export function isConsumable(object: any): object is Consumable {
    return object.canConsume != undefined && object.consume != undefined;
}
