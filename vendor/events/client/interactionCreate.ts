import {BotClient} from "../../lib/Client";
import {BaseEvent} from "../../public/BaseEvent";
import * as DJS from "discord.js";
import HelloSlashCommand from "../../commands/slash/Hello";

export default class MessageCreateEvent extends BaseEvent<BotClient> {
    public constructor(bot: BotClient) {
        super(bot, DJS.Events.InteractionCreate);
    }

    public override async execute(bot: BotClient, interaction: DJS.Interaction): Promise<void> {
        if (!this.isValidInteraction(interaction)) return;

        if (interaction.isUserContextMenuCommand()) {
            await this.handleUserContextMenu(interaction);
        } else if (interaction.isChatInputCommand()) {
            await this.handleChatInputCommand(bot, interaction);
        } else if (interaction.isButton() || interaction.isStringSelectMenu()) {
            await this.handleButtonOrSelectMenu(bot, interaction);
        } else {
            console.warn(`Unknown interaction type: ${interaction.type}`);
        }
    }

    private isValidInteraction(interaction: DJS.Interaction): boolean {
        return !!(interaction.guild && !interaction.user.bot);
    }

    private async handleUserContextMenu(interaction: DJS.UserContextMenuCommandInteraction): Promise<void> {
        const commandHandlers: Record<string, (interaction: DJS.UserContextMenuCommandInteraction) => Promise<void>> = {
            'HelloContextMenu': HelloSlashCommand.handleCommandInteraction.bind(this),
        };

        const handler = commandHandlers[interaction.commandName];
        if (handler) {
            await handler(interaction);
        } else {
            console.warn(`Unknown user context menu command: ${interaction.commandName}`);
        }
    }

    private async handleChatInputCommand(_bot: BotClient, interaction: DJS.ChatInputCommandInteraction): Promise<void> {
        const command = _bot.commands.get(interaction.commandName);
        if (command) {
            await command.execute(_bot, interaction);
        } else {
            console.warn(`Unknown command: ${interaction.commandName}`);
        }
    }

    private async handleButtonOrSelectMenu(_bot: BotClient, interaction: DJS.ButtonInteraction | DJS.StringSelectMenuInteraction): Promise<void> {
        for (const [, command] of _bot.commands) {
            if (command) {
                await command.execute(_bot, interaction);
            }
        }
    }
}