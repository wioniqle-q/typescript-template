import type { BotClient } from "../../lib/Client";
import BaseEvent from "../../public/BaseEvent";
import * as DJS from "discord.js";
export default class MessageCreateEvent extends BaseEvent {
    constructor({ bot }: {
        bot: BotClient;
    });
    execute(_bot: BotClient, _message: DJS.Message): Promise<any>;
}
