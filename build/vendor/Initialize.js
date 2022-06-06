"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const v10_1 = require("discord-api-types/v10");
const Client_1 = require("./lib/Client");
const discord_js_1 = require("discord.js");
const Controller_json_1 = __importDefault(require("./Controller.json"));
const clientOptions = {
    intents: Object.keys(v10_1.GatewayIntentBits).map((i) => (typeof i === 'string' ? v10_1.GatewayIntentBits[i] : i))
        .reduce((acc, p) => acc | p, 0),
    AllowedMentions: {
        parse: v10_1.AllowedMentionsTypes.User,
    },
    failIfNotExists: false,
    makeCache: discord_js_1.Options.cacheWithLimits({}),
    retryLimit: 3
};
exports.client = new Client_1.BotClient({ options: clientOptions });
exports.client.build({ _token: Controller_json_1.default.token });
