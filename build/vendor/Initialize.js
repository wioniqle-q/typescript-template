"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v10_1 = require("discord-api-types/v10");
const Client_1 = require("./lib/Client");
const discord_js_1 = require("discord.js");
const Controller_json_1 = __importDefault(require("./Controller.json"));
const clientOptions = {
    intents: Object.keys(v10_1.GatewayIntentBits).map((key) => typeof key === 'string' ? v10_1.GatewayIntentBits[key] : key).reduce((acc, intent) => acc | intent, 0),
    allowedMentions: {
        parse: [v10_1.AllowedMentionsTypes.User],
    },
    failIfNotExists: false,
    makeCache: discord_js_1.Options.cacheWithLimits({})
};
const client = new Client_1.BotClient(clientOptions);
client.build(Controller_json_1.default.token).catch(e => console.error(e));
