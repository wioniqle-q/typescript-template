import {ApplicationCommandType} from "discord-api-types/v10";

export const MenuCommands = [
    {
        name: 'HelloContextMenu',
        type: ApplicationCommandType.User
    }
] as const;

export const SlashCommands = [
    {
        name: 'hello',
        description: 'Say Hello.'
    }
] as const;