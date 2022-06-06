import type { BotClient } from "../../lib/Client";
import BaseEvent from "../../public/BaseEvent";
import * as DJS from "discord.js";

export default class ReadyEvent extends BaseEvent {
  public constructor({ bot }: { bot: BotClient; }) {
    super({ bot, name: DJS.Constants.Events.CLIENT_READY });
  }

  public override async execute(_bot: BotClient): Promise<any> {
    process.stdout.write("[INFO][events]: ready event executed!\n");
  }
}
