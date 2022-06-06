import { CommandManager } from './../modules/CommandManager';
import { Client, ClientOptions, Collection } from "discord.js";
import { EventManager } from "../modules/EventManager";
import { Command } from '../public/BaseCommand';

export class BotClient extends Client {
    event: EventManager;
    commands: Collection<string, Command> = new Collection();
    command: CommandManager;

    constructor({ options }: { options: ClientOptions; }) {
        super(options);

        this.event = new EventManager({ _bot: this });
        this.command = new CommandManager({ _bot: this });
    }

    public async build({ _token }: { _token?: string; } = {}): Promise<void> {
        await super.login(_token);
        await this.event.registerEvent();
        await this.command.registerCommand();
    }
};