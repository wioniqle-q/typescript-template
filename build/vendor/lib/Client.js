"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotClient = void 0;
const CommandManager_1 = require("./../modules/CommandManager");
const discord_js_1 = require("discord.js");
const EventManager_1 = require("../modules/EventManager");
class BotClient extends discord_js_1.Client {
    event;
    commands = new discord_js_1.Collection();
    command;
    constructor({ options }) {
        super(options);
        this.event = new EventManager_1.EventManager({ _bot: this });
        this.command = new CommandManager_1.CommandManager({ _bot: this });
    }
    async build({ _token } = {}) {
        await super.login(_token);
        await this.event.registerEvent();
        await this.command.registerCommand();
    }
}
exports.BotClient = BotClient;
;
