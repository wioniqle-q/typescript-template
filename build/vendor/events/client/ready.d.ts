import { BotClient } from "../../lib/Client";
import { BaseEvent } from "../../public/BaseEvent";
export default class ReadyEvent extends BaseEvent<BotClient> {
    constructor(bot: BotClient);
    execute(_bot: BotClient): Promise<void>;
}
