import {Game} from "./game/Game";
import {Wallet} from "./engine/features/wallet/Wallet";
import {Settings} from "@/engine/features/settings/Settings";
import {Statistics} from "@/engine/features/statistics/Statistics";
import {Achievements} from "@/engine/features/achievements/Achievements";
import {WorldBuilder} from "@/game/features/world/WorldBuilder";
import {Player} from "@/game/features/player/Player";
import {PlayerInventory} from "@/game/features/inventory/PlayerInventory";
import {Skills} from "@/game/features/skills/Skills";

export class App {

    static readonly debug = false;
    static game: Game;


    static start(): void {
        this.game = this.createNewGame()
        this.game.initialize();
        this.game.load();
        this.game.start();
    }

    static createNewGame(): Game {
        return new Game(
            new Player(),
            new PlayerInventory(),
            new Wallet(),
            new Skills(),
            WorldBuilder.createWorld(),
            new Settings(),
            new Statistics(),
            new Achievements(),
        );
    }
}
