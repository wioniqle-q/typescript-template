import {BotClient} from "../../lib/Client";
import {BaseEvent} from "../../public/BaseEvent";
import * as DJS from "discord.js";

export default class ReadyEvent extends BaseEvent<BotClient> {
    public constructor(bot: BotClient) {
        super(bot, DJS.Events.ClientReady);
    }

    public override async execute(_bot: BotClient): Promise<void> {
        process.stdout.write("[INFO][events]: ready event executed!\n");
    }
}
