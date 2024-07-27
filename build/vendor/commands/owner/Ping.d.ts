import { BotClient } from '../../lib/Client';
import { Command } from "../../public/BaseCommand";
import type * as DJS from "discord.js";
import PingCommandOptions from "../../interfaces/commands/PingCommandOptions";
export default class PingCommand extends Command<BotClient, PingCommandOptions> {
    constructor(bot: BotClient);
    execute(_bot: BotClient, _message: DJS.Message, ..._args: unknown[]): Promise<void>;
}
