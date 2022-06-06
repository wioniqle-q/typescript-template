import type { BotClient } from "../../lib/Client";
import BaseEvent from "../../public/BaseEvent";
import * as DJS from "discord.js";
import Controller from "../../Controller.json";

export default class MessageCreateEvent extends BaseEvent {
  public constructor({ bot }: { bot: BotClient; }) {
    super({ bot, name: DJS.Constants.Events.MESSAGE_CREATE });
  }

  public override async execute(_bot: BotClient, _message: DJS.Message): Promise<any> {
      if (!_message.guild || _message.author.bot || !_message.content.startsWith(Controller.prefix)) return;
      
      const args = _message.content.slice(Controller.prefix.length).trim().split(/ +/g);
      const commandName = args.shift()!.toLowerCase();
      const command = _bot.commands.get(commandName);
      if (!command) return;

      try {
          await command.execute(_bot, _message, ...args);
      } catch (error) {
          _message.channel.send("An error occurred while executing the command!");
      }
  }
}
