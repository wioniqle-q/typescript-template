import { Client, ClientOptions, Collection } from "discord.js";
import { EventManager } from "../modules/EventManager";
import { CommandManager } from "../modules/CommandManager";
import { Command } from '../public/BaseCommand';
export declare class BotClient extends Client {
    event: EventManager<this>;
    commands: Collection<string, Command<this>>;
    command: CommandManager<this>;
    constructor(options: ClientOptions);
    build(token?: string): Promise<void>;
}
