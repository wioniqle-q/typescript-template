import type { BotClient } from '../lib/Client';
export interface CommandOptions<N = string, D = string | undefined> {
    name: N;
    description?: D;
}
export declare abstract class Command<B extends BotClient, O extends CommandOptions = CommandOptions> {
    name: O['name'];
    description?: O['description'];
    protected bot: B;
    protected constructor(bot: B, options: O);
    /**
     * @param bot {B}
     * @param args {unknown[]}
     * @returns {Promise<void>}
     */
    abstract execute(bot: B, ...args: unknown[]): Promise<void>;
}
