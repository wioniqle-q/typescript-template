import { BotClient } from "../lib/Client";
export declare class EventManager<B extends BotClient = BotClient> {
    private readonly bot;
    constructor(bot: B);
    registerEvent(): Promise<void>;
}
