import { IBot } from './bot.model';
import { IBotConfig } from './bot-config.model';
import { CommandMap } from '../helpers';
import { ParsedArgs } from 'minimist';
import { Interface } from 'readline';
import { SuccessfulParsedMessage } from 'discord-command-parser';
import { Message, Client } from 'discord.js';

export abstract class IBotPlugin {
    preInitialize<T extends IBotConfig>(bot: IBot<T>) { }
    postInitialize<T extends IBotConfig>(bot: IBot<T>) { }
    registerConsoleCommands(map: CommandMap<(args: ParsedArgs, rl: Interface) => void>) { }
    registerDiscordCommands(map: CommandMap<(cmd: SuccessfulParsedMessage<Message>, msg: Message) => void>) { }
    clientBound(client: Client) { }
    onReady(client: Client) { }
}
