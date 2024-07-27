import glob from 'fast-glob';
import {parse} from 'path';
import {BotClient} from "../lib/Client";
import {Command} from "../public/BaseCommand";

export class CommandManager<B extends BotClient = BotClient, C extends Command<B> = Command<B>> {
    private readonly bot: B;

    constructor(bot: B) {
        this.bot = bot;
    }

    public async registerCommand(): Promise<void> {
        const files = glob.sync("./vendor/commands/**/*.ts");

        const promises = files.map(async (file) => {
            delete require.cache[file];

            const {name} = parse(`../../${file}`);
            if (!name) {
                process.stdout.write(`[ERROR][commands]: ${file} is not a valid file!\n`);
                return;
            }

            try {
                const CommandClass = (await import(`../../${file}`)).default;
                const command = new CommandClass(this.bot, {name}) as C;

                if (typeof command.execute !== 'function') {
                    process.stdout.write(`[ERROR][commands]: ${file} is not a valid command!\n`);
                    return;
                }

                this.bot.commands.set(command.name, command);
                process.stdout.write(`[INFO][commands]: ${file} registered!\n`);
            } catch (error) {
                process.stdout.write(`[ERROR][commands]: Failed to load command from ${file}\n`);
                console.error(error);
            }
        });

        await Promise.all(promises);
    }
}
