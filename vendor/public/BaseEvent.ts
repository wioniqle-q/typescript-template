import type {BotClient} from "../lib/Client";
import type * as DJS from "discord.js";

export type EventName = keyof DJS.ClientEvents;

export abstract class BaseEvent<B extends BotClient> {
    public name: EventName;
    protected bot: B;

    protected constructor(bot: B, name: EventName) {
        this.bot = bot;
        this.name = name;
    }

    /**
     * @param bot {B}
     * @param args {unknown[]}
     * @returns {DJS.Awaitable<any>}
     */
    abstract execute(bot: B, ...args: unknown[]): DJS.Awaitable<any>;
}
