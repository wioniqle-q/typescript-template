import {BotClient} from "../../lib/Client";
import {BaseEvent} from "../../public/BaseEvent";
import * as DJS from "discord.js";
import Controller from "../../Controller.json";

export default class MessageCreateEvent extends BaseEvent<BotClient> {
    public constructor(bot: BotClient) {
        super(bot, DJS.Events.MessageCreate);
    }

    public override async execute(bot: BotClient, message: DJS.Message): Promise<void> {
        if (!message.guild || message.author.bot || !message.content.startsWith(Controller.prefix)) return;

        const args = message.content.slice(Controller.prefix.length).trim().split(/ +/g);
        const commandName = args.shift()!.toLowerCase();
        const command = bot.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(bot, message, ...args);
        } catch (error) {
            console.error("Error executing command:", error);
            message.channel.send("An error occurred while executing the command!");
        }
    }
}