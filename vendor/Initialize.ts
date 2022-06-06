import { GatewayIntentBits, AllowedMentionsTypes } from 'discord-api-types/v10';
import { BotClient } from "./lib/Client";
import { Options } from 'discord.js';
import Controller from './Controller.json';

const clientOptions = {
    intents: Object.keys(GatewayIntentBits).map((i) => (typeof i === 'string' ? GatewayIntentBits[i as keyof typeof GatewayIntentBits] : i))
    .reduce((acc, p) => acc | p, 0),
    AllowedMentions: {
        parse: AllowedMentionsTypes.User,
    },
    failIfNotExists: false,
    makeCache: Options.cacheWithLimits({}),
    retryLimit: 3
}

export const client = new BotClient({ options: clientOptions });
client.build({ _token: Controller.token });
