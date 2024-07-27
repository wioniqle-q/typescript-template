import glob from 'fast-glob';
import {parse} from 'path';
import {BotClient} from "../lib/Client";
import {BaseEvent} from "../public/BaseEvent";

export class EventManager<B extends BotClient = BotClient> {
    private readonly bot: B;

    constructor(bot: B) {
        this.bot = bot;
    }

    public async registerEvent(): Promise<void> {
        const files = glob.sync("./vendor/events/**/*.ts");

        const promises = files.map(async (file) => {
            delete require.cache[file];

            const {name} = parse(`../../${file}`);
            if (!name) {
                process.stdout.write(`[ERROR][events]: ${file} is not a valid file!\n`);
                return;
            }

            try {
                const EventClass = (await import(`../../${file}`)).default;
                const event = new EventClass(this.bot, {name}) as BaseEvent<any>;

                if (typeof event.execute !== 'function') {
                    process.stdout.write(`[ERROR][events]: ${file} is not a valid event!\n`);
                    return;
                }

                this.bot.on(event.name, async (...args: any[]) => {
                    try {
                        await event.execute(this.bot, ...args);
                    } catch (error) {
                        process.stdout.write(`[ERROR][events]: Error executing event ${event.name}\n`);
                        console.error(error);
                    }
                });

                process.stdout.write(`[INFO][events]: ${file} registered!\n`);
            } catch (error) {
                process.stdout.write(`[ERROR][events]: Failed to load event from ${file}\n`);
                console.error(error);
            }
        });

        await Promise.all(promises);
    }
}
