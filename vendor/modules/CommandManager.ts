import glob from 'fast-glob';
import { parse } from 'path';
import { BotClient } from "../lib/Client";
import { Command } from "../public/BaseCommand";

export class CommandManager { 
    private _bot: BotClient;
    
    constructor({ _bot }: { _bot: BotClient; }) {
        this._bot = _bot; 
    } 

    public async registerCommand(): Promise<void> {
        const files = glob.sync("./vendor/commands/**/*.ts"); 
        
        for (const file of files) { 
            delete require.cache[file]; 
            
            const { name } =  parse(`../../${file}`); 
            if (!name) process.stdout.write(`[ERROR][commands]: ${file} is not a valid file!\n`);
            
            const command = new (await import(`../../${file}`)).default(this._bot, name) as Command; 
            if (!command.execute) process.stdout.write(`[ERROR][commands]: ${file} is not a valid command!\n`);

            this._bot.commands.set(command.name, command);
            
            process.stdout.write(`[INFO][commands]: ${file} registered!\n`);
        } 
    }
}