import type { BotClient } from './../lib/Client';
import type * as DJS from "discord.js";
export interface CommandOptions {
    name: string;
    description?: string;
    options?: {
        [key: string]: string;
    };
}
export declare abstract class Command {
    bot: BotClient;
    name: string;
    options: CommandOptions;
    constructor(bot: BotClient, options: CommandOptions);
    /**
     * @param {BotClient}
     * @param {DJS.Message}
     * @returns {DJS.Awaitable<void>}
     */
    abstract execute(bot: BotClient, ...args: unknown[]): DJS.Awaitable<any>;
}
