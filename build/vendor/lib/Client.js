"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotClient = void 0;
const discord_js_1 = require("discord.js");
const EventManager_1 = require("../modules/EventManager");
const CommandManager_1 = require("../modules/CommandManager");
const Controller_json_1 = __importDefault(require("../Controller.json"));
const defaults_1 = require("../defaults");
class BotClient extends discord_js_1.Client {
    event;
    commands = new discord_js_1.Collection();
    command;
    constructor(options) {
        super(options);
        this.event = new EventManager_1.EventManager(this);
        this.command = new CommandManager_1.CommandManager(this);
    }
    async build(token) {
        await super.login(token);
        await this.event.registerEvent();
        await this.command.registerCommand();
        this.once('ready', async () => {
            if (!this.application?.commands) {
                console.warn('Application or commands property is not available.');
                return;
            }
            try {
                const rest = new discord_js_1.REST({ version: '10' }).setToken(token);
                const [menuCommands, slashCommands] = await Promise.all([
                    Promise.all(defaults_1.MenuCommands),
                    Promise.all(defaults_1.SlashCommands)
                ]);
                await Promise.all([
                    rest.put(discord_js_1.Routes.applicationGuildCommands(Controller_json_1.default.clientId, Controller_json_1.default.guildId), { body: menuCommands }),
                    rest.put(discord_js_1.Routes.applicationCommands(Controller_json_1.default.clientId), { body: slashCommands })
                ]);
                process.stdout.write('Commands registered successfully.\n');
            }
            catch (error) {
                process.stdout.write('Error registering commands: ' + error + '\n');
            }
        });
    }
}
exports.BotClient = BotClient;
