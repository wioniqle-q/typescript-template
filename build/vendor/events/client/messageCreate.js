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
const BaseEvent_1 = __importDefault(require("../../public/BaseEvent"));
const DJS = __importStar(require("discord.js"));
const Controller_json_1 = __importDefault(require("../../Controller.json"));
class MessageCreateEvent extends BaseEvent_1.default {
    constructor({ bot }) {
        super({ bot, name: DJS.Constants.Events.MESSAGE_CREATE });
    }
    async execute(_bot, _message) {
        if (!_message.guild || _message.author.bot || !_message.content.startsWith(Controller_json_1.default.prefix))
            return;
        const args = _message.content.slice(Controller_json_1.default.prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = _bot.commands.get(commandName);
        if (!command)
            return;
        try {
            await command.execute(_bot, _message, ...args);
        }
        catch (error) {
            _message.channel.send("An error occurred while executing the command!");
        }
    }
}
exports.default = MessageCreateEvent;