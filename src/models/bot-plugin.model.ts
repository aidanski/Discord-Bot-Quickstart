import { IBot } from './bot.model';
import { IBotConfig } from './bot-config.model';

export interface IBotPlugin {
    preInitialize<T extends IBotConfig>(bot: IBot<T>): void;
    postInitialize<T extends IBotConfig>(bot: IBot<T>): void;
}
