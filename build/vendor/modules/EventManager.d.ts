import { BotClient } from "../lib/Client";
export declare class EventManager {
    private _bot;
    constructor({ _bot }: {
        _bot: BotClient;
    });
    registerEvent(): Promise<void>;
}
