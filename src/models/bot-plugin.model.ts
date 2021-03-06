import { IBot } from './bot.model';
import { IBotConfig } from './bot-config.model';
import { CommandMap } from '../helpers';
import { ParsedArgs } from 'minimist';
import { Interface } from 'readline';
import { SuccessfulParsedMessage } from 'discord-command-parser';
import { Message, Client } from 'discord.js';

export abstract class IBotPlugin {
    abstract preInitialize<T extends IBotConfig>(bot: IBot<T>): void;
    abstract registerConsoleCommands(map: CommandMap<(args: ParsedArgs, rl: Interface) => void>): void;
    abstract registerDiscordCommands(map: CommandMap<(cmd: SuccessfulParsedMessage<Message>, msg: Message) => void>): void;
    abstract clientBound(client: Client): void;
    abstract postInitialize<T extends IBotConfig>(bot: IBot<T>): void;
    abstract onReady(client: Client): void;
}
