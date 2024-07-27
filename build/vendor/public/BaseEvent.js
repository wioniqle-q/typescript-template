"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
class BaseEvent {
    name;
    bot;
    constructor(bot, name) {
        this.bot = bot;
        this.name = name;
    }
}
exports.BaseEvent = BaseEvent;
