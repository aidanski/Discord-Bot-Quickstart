
import { directory } from '../helpers';
import * as path from 'path';
import { createLogger, transports, format } from 'winston';
const { Console, File } = transports;
const { combine, timestamp, printf } = format;

const lineFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] (${level}): ${message}`;
});

export function generateLogger(filePath: string) {
    return createLogger({
        level: 'silly',
        format: combine(
            timestamp(),
            lineFormat
        ),
        transports: [
            new Console(),
            new File({ filename: path.basename(filePath), dirname: path.dirname(filePath), maxsize: 1e+7 })
        ]
    });
};
