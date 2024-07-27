"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommands = exports.MenuCommands = void 0;
const v10_1 = require("discord-api-types/v10");
exports.MenuCommands = [
    {
        name: 'HelloContextMenu',
        type: v10_1.ApplicationCommandType.User
    }
];
exports.SlashCommands = [
    {
        name: 'hello',
        description: 'Say Hello.'
    }
];
