"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseEvent {
    bot;
    name;
    constructor({ bot, name }) {
        this.bot = bot;
        this.name = name;
    }
}
exports.default = BaseEvent;
