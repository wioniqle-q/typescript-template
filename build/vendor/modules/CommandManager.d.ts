import { BotClient } from "../lib/Client";
export declare class CommandManager {
    private _bot;
    constructor({ _bot }: {
        _bot: BotClient;
    });
    registerCommand(): Promise<void>;
}
