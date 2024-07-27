import { BotClient } from "../../lib/Client";
import { BaseEvent } from "../../public/BaseEvent";
import * as DJS from "discord.js";
export default class MessageCreateEvent extends BaseEvent<BotClient> {
    constructor(bot: BotClient);
    execute(bot: BotClient, interaction: DJS.Interaction): Promise<void>;
    private isValidInteraction;
    private handleUserContextMenu;
    private handleChatInputCommand;
    private handleButtonOrSelectMenu;
}
