import {AllowedMentionsTypes, GatewayIntentBits} from 'discord-api-types/v10';
import {BotClient} from "./lib/Client";
import {ClientOptions, Options} from 'discord.js';
import Controller from './Controller.json';

const clientOptions: ClientOptions = {
    intents: Object.keys(GatewayIntentBits).map((key) =>
        typeof key === 'string' ? GatewayIntentBits[key as keyof typeof GatewayIntentBits] : key
    ).reduce((acc, intent) => acc | intent, 0),
    allowedMentions: {
        parse: [AllowedMentionsTypes.User],
    },
    failIfNotExists: false,
    makeCache: Options.cacheWithLimits({})
};

const client = new BotClient(clientOptions);
client.build(Controller.token).catch(e => console.error(e));
