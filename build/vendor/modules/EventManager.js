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
exports.EventManager = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = require("path");
class EventManager {
    bot;
    constructor(bot) {
        this.bot = bot;
    }
    async registerEvent() {
        const files = fast_glob_1.default.sync("./vendor/events/**/*.ts");
        const promises = files.map(async (file) => {
            delete require.cache[file];
            const { name } = (0, path_1.parse)(`../../${file}`);
            if (!name) {
                process.stdout.write(`[ERROR][events]: ${file} is not a valid file!\n`);
                return;
            }
            try {
                const EventClass = (await Promise.resolve(`${`../../${file}`}`).then(s => __importStar(require(s)))).default;
                const event = new EventClass(this.bot, { name });
                if (typeof event.execute !== 'function') {
                    process.stdout.write(`[ERROR][events]: ${file} is not a valid event!\n`);
                    return;
                }
                this.bot.on(event.name, async (...args) => {
                    try {
                        await event.execute(this.bot, ...args);
                    }
                    catch (error) {
                        process.stdout.write(`[ERROR][events]: Error executing event ${event.name}\n`);
                        console.error(error);
                    }
                });
                process.stdout.write(`[INFO][events]: ${file} registered!\n`);
            }
            catch (error) {
                process.stdout.write(`[ERROR][events]: Failed to load event from ${file}\n`);
                console.error(error);
            }
        });
        await Promise.all(promises);
    }
}
exports.EventManager = EventManager;
