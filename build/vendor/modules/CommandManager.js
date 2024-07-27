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
exports.CommandManager = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const path_1 = require("path");
class CommandManager {
    bot;
    constructor(bot) {
        this.bot = bot;
    }
    async registerCommand() {
        const files = fast_glob_1.default.sync("./vendor/commands/**/*.ts");
        const promises = files.map(async (file) => {
            delete require.cache[file];
            const { name } = (0, path_1.parse)(`../../${file}`);
            if (!name) {
                process.stdout.write(`[ERROR][commands]: ${file} is not a valid file!\n`);
                return;
            }
            try {
                const CommandClass = (await Promise.resolve(`${`../../${file}`}`).then(s => __importStar(require(s)))).default;
                const command = new CommandClass(this.bot, { name });
                if (typeof command.execute !== 'function') {
                    process.stdout.write(`[ERROR][commands]: ${file} is not a valid command!\n`);
                    return;
                }
                this.bot.commands.set(command.name, command);
                process.stdout.write(`[INFO][commands]: ${file} registered!\n`);
            }
            catch (error) {
                process.stdout.write(`[ERROR][commands]: Failed to load command from ${file}\n`);
                console.error(error);
            }
        });
        await Promise.all(promises);
    }
}
exports.CommandManager = CommandManager;
