"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCommand_1 = require("../../public/BaseCommand");
class BaseCommand extends BaseCommand_1.Command {
    constructor({ bot }) {
        super(bot, {
            name: "string",
            description: "string"
        });
    }
    async execute(_bot, _message, ..._args) {
        return await _message.channel.send("Hello World!");
    }
}
exports.default = BaseCommand;
