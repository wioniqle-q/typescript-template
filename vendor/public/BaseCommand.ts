import type {BotClient} from '../lib/Client';

export interface CommandOptions<N = string, D = string | undefined> {
    name: N;
    description?: D;
}

export abstract class Command<B extends BotClient, O extends CommandOptions = CommandOptions> {
    public name: O['name'];
    public description?: O['description'];
    protected bot: B;

    protected constructor(bot: B, options: O) {
        this.bot = bot;
        this.name = options.name;
        this.description = options.description;
    }

    /**
     * @param bot {B}
     * @param args {unknown[]}
     * @returns {Promise<void>}
     */
    abstract execute(bot: B, ...args: unknown[]): Promise<void>;
}