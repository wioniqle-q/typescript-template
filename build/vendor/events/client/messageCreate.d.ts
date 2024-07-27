import { BotClient } from "../../lib/Client";
import { BaseEvent } from "../../public/BaseEvent";
import * as DJS from "discord.js";
export default class MessageCreateEvent extends BaseEvent<BotClient> {
    constructor(bot: BotClient);
    execute(bot: BotClient, message: DJS.Message): Promise<void>;
}
