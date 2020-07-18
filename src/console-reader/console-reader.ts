
import { CommandMap } from '../helpers';

import { Logger } from 'winston';
import * as readline from 'readline';
import * as minimist from 'minimist';
import { ParsedArgs } from 'minimist';
import { Interface } from 'readline';

export class ConsoleReader {
    logger: Logger;
    commands: CommandMap<(args: ParsedArgs, rl: Interface) => void>;

    constructor(logger: Logger) {
        this.logger = logger;
        this.commands = new CommandMap();
    }
    
    listen() {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on('line', input => {
            if(!input) return;
            let parts = input.split(' ');
            let result = minimist(parts);
            if(this.commands.has(result._[0])) {
                let cmds = this.commands.get(result._[0]);
                cmds.forEach(cmd => cmd(result, rl));
            }
        });
        rl.on('close', () => {
            this.logger.debug('Console Reader Disconnected');
        });
    }

}
