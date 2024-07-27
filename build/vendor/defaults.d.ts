import { ApplicationCommandType } from "discord-api-types/v10";
export declare const MenuCommands: readonly [{
    readonly name: "HelloContextMenu";
    readonly type: ApplicationCommandType.User;
}];
export declare const SlashCommands: readonly [{
    readonly name: "hello";
    readonly description: "Say Hello.";
}];
