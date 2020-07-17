
import { directory } from '../helpers';
import { createLogger, transports, format } from 'winston';
const { Console, File } = transports;
const { combine, timestamp, printf } = format;

const lineFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] (${level}): ${message}`;
});

const Log = createLogger({
    level: 'silly',
    format: combine(
        timestamp(),
        lineFormat
    ),
    transports: [
        new Console(),
        new File({ filename: 'bot.log', dirname: directory, maxsize: 1e+7 })
    ]
});

export { Log };
