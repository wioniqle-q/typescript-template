import { BotClient } from "../lib/Client";
import BaseEvent from "../public/BaseEvent";
import glob from "fast-glob";
import { parse } from "node:path";

export class EventManager { 
    private _bot: BotClient;
    
    constructor({ _bot }: { _bot: BotClient; }) {
        this._bot = _bot; 
    } 

    public async registerEvent(): Promise<void> {
        const files = glob.sync("./vendor/events/**/*.ts"); 
        
        for (const file of files) { 
            delete require.cache[file]; 
            
            const { name } =  parse(`../../${file}`); 
            if (!name) process.stdout.write(`[ERROR][events]: ${file} is not a valid file!\n`);
            
            const event = new (await import(`../../${file}`)).default(this._bot, name) as BaseEvent; 
            if (!event.execute) process.stdout.write(`[ERROR][events]: ${file} is not a valid event!\n`);
            
            this._bot.on(event.name, async (...args: any[]) => {
                await event.execute(this._bot, ...args);
            });

            process.stdout.write(`[INFO][events]: ${file} registered!\n`);
        } 
    }
}