
import { BotClient } from './../../lib/Client';
import { Command } from "../../public/BaseCommand";
import type * as DJS from "discord.js";

export default abstract class BaseCommand extends Command {
    constructor({ bot }: { bot: BotClient; }) {
        super(bot, {
            name: "string",
            description: "string"
        });
    }

    public override async execute(_bot: BotClient, _message: DJS.Message, ..._args: unknown[]) {
        return await _message.channel.send("Hello World!");   
    }
}