"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    bot;
    name;
    options;
    constructor(bot, options) {
        this.bot = bot;
        this.name = options.name;
        this.options = options;
    }
}
exports.Command = Command;
