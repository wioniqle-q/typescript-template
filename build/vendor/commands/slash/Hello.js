"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = require("../../public/BaseCommand");
class HelloCommand extends BaseCommand_1.Command {
    constructor(bot) {
        super(bot, {
            name: 'hello',
            description: 'Say Hello.',
        });
    }
    static async handleCommandInteraction(interaction) {
        await interaction.reply({
            content: 'Hello This Is the Test Slash/Context Menu!',
            ephemeral: true
        });
    }
    async execute(_bot, interaction, ..._args) {
        process.stdout.write('PingSlash command executed!\n');
        try {
            if (interaction.isCommand()) {
                await HelloCommand.handleCommandInteraction(interaction);
            }
            else {
                console.warn('Unknown interaction type:', interaction);
            }
        }
        catch (error) {
            console.error('Error handling interaction:', error);
            await this.handleError(interaction);
        }
    }
    async handleError(interaction) {
        if (interaction.isRepliable()) {
            try {
                await interaction.reply({
                    content: 'An error occurred while processing your request.',
                    ephemeral: true
                });
            }
            catch (replyError) {
                console.error('Error sending error reply:', replyError);
            }
        }
    }
}
exports.default = HelloCommand;
