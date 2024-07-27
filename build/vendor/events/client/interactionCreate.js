"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEvent_1 = require("../../public/BaseEvent");
const DJS = __importStar(require("discord.js"));
const Hello_1 = __importDefault(require("../../commands/slash/Hello"));
class MessageCreateEvent extends BaseEvent_1.BaseEvent {
    constructor(bot) {
        super(bot, DJS.Events.InteractionCreate);
    }
    async execute(bot, interaction) {
        if (!this.isValidInteraction(interaction))
            return;
        if (interaction.isUserContextMenuCommand()) {
            await this.handleUserContextMenu(interaction);
        }
        else if (interaction.isChatInputCommand()) {
            await this.handleChatInputCommand(bot, interaction);
        }
        else if (interaction.isButton() || interaction.isStringSelectMenu()) {
            await this.handleButtonOrSelectMenu(bot, interaction);
        }
        else {
            console.warn(`Unknown interaction type: ${interaction.type}`);
        }
    }
    isValidInteraction(interaction) {
        return !!(interaction.guild && !interaction.user.bot);
    }
    async handleUserContextMenu(interaction) {
        const commandHandlers = {
            'HelloContextMenu': Hello_1.default.handleCommandInteraction.bind(this),
        };
        const handler = commandHandlers[interaction.commandName];
        if (handler) {
            await handler(interaction);
        }
        else {
            console.warn(`Unknown user context menu command: ${interaction.commandName}`);
        }
    }
    async handleChatInputCommand(_bot, interaction) {
        const command = _bot.commands.get(interaction.commandName);
        if (command) {
            await command.execute(_bot, interaction);
        }
        else {
            console.warn(`Unknown command: ${interaction.commandName}`);
        }
    }
    async handleButtonOrSelectMenu(_bot, interaction) {
        for (const [, command] of _bot.commands) {
            if (command) {
                await command.execute(_bot, interaction);
            }
        }
    }
}
exports.default = MessageCreateEvent;
