import { CommandManager } from './../modules/CommandManager';
import { Client, ClientOptions, Collection } from "discord.js";
import { EventManager } from "../modules/EventManager";
import { Command } from '../public/BaseCommand';
export declare class BotClient extends Client {
    event: EventManager;
    commands: Collection<string, Command>;
    command: CommandManager;
    constructor({ options }: {
        options: ClientOptions;
    });
    build({ _token }?: {
        _token?: string;
    }): Promise<void>;
}
