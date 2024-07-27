import {BotClient} from '../../lib/Client';
import {Command} from "../../public/BaseCommand";
import BanCommandOptions from "../../interfaces/commands/PingCommandOptions";
import {CommandInteraction, Interaction} from "discord.js";

export default class HelloCommand extends Command<BotClient, BanCommandOptions> {
    constructor(bot: BotClient) {
        super(bot, {
            name: 'hello',
            description: 'Say Hello.',
        });
    }

    public static async handleCommandInteraction(interaction: CommandInteraction): Promise<void> {
        await interaction.reply({
            content: 'Hello This Is the Test Slash/Context Menu!',
            ephemeral: true
        });
    }

    async execute(_bot: BotClient, interaction: Interaction, ..._args: unknown[]): Promise<void> {
        process.stdout.write('PingSlash command executed!\n');

        try {
            if (interaction.isCommand()) {
                await HelloCommand.handleCommandInteraction(interaction as CommandInteraction);
            } else {
                console.warn('Unknown interaction type:', interaction);
            }
        } catch (error) {
            console.error('Error handling interaction:', error);
            await this.handleError(interaction);
        }
    }

    private async handleError(interaction: Interaction): Promise<void> {
        if (interaction.isRepliable()) {
            try {
                await interaction.reply({
                    content: 'An error occurred while processing your request.',
                    ephemeral: true
                });
            } catch (replyError) {
                console.error('Error sending error reply:', replyError);
            }
        }
    }
}