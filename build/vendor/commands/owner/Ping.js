"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = require("../../public/BaseCommand");
class PingCommand extends BaseCommand_1.Command {
    constructor(bot) {
        super(bot, {
            name: 'ping',
            description: 'Ping the bot',
        });
    }
    async execute(_bot, _message, ..._args) {
        _message.channel.send('Pong!');
    }
}
exports.default = PingCommand;
