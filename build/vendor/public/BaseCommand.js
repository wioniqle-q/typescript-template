"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    name;
    description;
    bot;
    constructor(bot, options) {
        this.bot = bot;
        this.name = options.name;
        this.description = options.description;
    }
}
exports.Command = Command;
