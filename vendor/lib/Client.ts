import {Client, ClientOptions, Collection, REST, Routes} from "discord.js";
import {EventManager} from "../modules/EventManager";
import {CommandManager} from "../modules/CommandManager";
import {Command} from '../public/BaseCommand';
import Controller from "../Controller.json";
import {MenuCommands, SlashCommands} from "../defaults";

export class BotClient extends Client {
    public event: EventManager<this>;
    public commands: Collection<string, Command<this>> = new Collection();
    public command: CommandManager<this>;

    constructor(options: ClientOptions) {
        super(options);

        this.event = new EventManager(this);
        this.command = new CommandManager(this);
    }

    public async build(token?: string): Promise<void> {
        await super.login(token);
        await this.event.registerEvent();
        await this.command.registerCommand();

        this.once('ready', async () => {
            if (!this.application?.commands) {
                console.warn('Application or commands property is not available.');
                return;
            }

            try {
                const rest = new REST({version: '10'}).setToken(token as string);

                const [menuCommands, slashCommands] = await Promise.all([
                    Promise.all(MenuCommands),
                    Promise.all(SlashCommands)
                ]);

                await Promise.all([
                    rest.put(
                        Routes.applicationGuildCommands(Controller.clientId, Controller.guildId),
                        {body: menuCommands}
                    ),
                    rest.put(
                        Routes.applicationCommands(Controller.clientId),
                        {body: slashCommands}
                    )
                ]);

                process.stdout.write('Commands registered successfully.\n');
            } catch (error) {
                process.stdout.write('Error registering commands: ' + error + '\n');
            }
        });
    }
}
