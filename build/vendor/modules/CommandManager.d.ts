import { BotClient } from "../lib/Client";
import { Command } from "../public/BaseCommand";
export declare class CommandManager<B extends BotClient = BotClient, C extends Command<B> = Command<B>> {
    private readonly bot;
    constructor(bot: B);
    registerCommand(): Promise<void>;
}
