import { BotClient } from '../../lib/Client';
import { Command } from "../../public/BaseCommand";
import BanCommandOptions from "../../interfaces/commands/PingCommandOptions";
import { CommandInteraction, Interaction } from "discord.js";
export default class HelloCommand extends Command<BotClient, BanCommandOptions> {
    constructor(bot: BotClient);
    static handleCommandInteraction(interaction: CommandInteraction): Promise<void>;
    execute(_bot: BotClient, interaction: Interaction, ..._args: unknown[]): Promise<void>;
    private handleError;
}
