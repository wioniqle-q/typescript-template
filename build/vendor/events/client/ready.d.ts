import type { BotClient } from "../../lib/Client";
import BaseEvent from "../../public/BaseEvent";
export default class ReadyEvent extends BaseEvent {
    constructor({ bot }: {
        bot: BotClient;
    });
    execute(_bot: BotClient): Promise<any>;
}
