import type { BotClient } from "../lib/Client";
import type * as DJS from "discord.js";

export type EventName = keyof DJS.ClientEvents;

export default abstract class BaseEvent {
    bot: BotClient;
    name: EventName;
  
    constructor({ bot, name }: { bot: BotClient; name: EventName; }) {
      this.bot = bot;
      this.name = name;
    }
  
    /**
     * @param {BotClient}
     * @param {string[]}
     * @returns {DJS.Awaitable<void>}
     */
    abstract execute(bot: BotClient, ...args: unknown[]): DJS.Awaitable<any>;
  }
  