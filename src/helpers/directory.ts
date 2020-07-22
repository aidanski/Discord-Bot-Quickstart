
import * as path from 'path';
import * as fs from 'fs';
import { readFileSync, writeFileSync } from 'jsonfile';

export const directory = path.resolve(path.dirname(require.main.filename));

export const ensureDirectory = async (dirPath: string) => {
    await fs.promises.mkdir(dirPath, { recursive: true });
};

export const projectDir = (...args: string[]) => {
    if (args.some(x => x.startsWith('./') || x.startsWith('../'))) {
        return path.resolve(directory, ...args);
    }
    return path.resolve(...args);
};

export const readJson = (...args: string[]) => {
    return readFileSync(projectDir(...args), { encoding: 'utf8' });
};

export const requireFile = (...args: string[]) => {
    return require(projectDir(...args));
};

export const readFile = (...args: string[]) => {
    return fs.readFileSync(projectDir(...args), { encoding: 'utf8' }); 
};

export const readDir = (...args: string[]) => {
    if (!fileExists(...args)) {
        return [];
    }
    return fs.readdirSync(projectDir(...args)); 
};

export const writeFile = async (data: any, ...args: string[]) => {
    const target = projectDir(...args);
    await ensureDirectory(path.dirname(target));
    return fs.writeFileSync(target, data, { encoding: 'utf8' }); 
};

export const writeJson = async (data: any, ...args: string[]) => {
    const target = projectDir(...args);
    await ensureDirectory(path.dirname(target));
    return writeFileSync(target, data, { encoding: 'utf8' });
};

export const appendFile = async (data: any, ...args: string[]) => {
    const target = projectDir(...args);
    await ensureDirectory(path.dirname(target));
    return fs.appendFileSync(target, data, { encoding: 'utf8' });
};

export const fileExists = (...args: string[]) => {
    return fs.existsSync(projectDir(...args));
};

export const deleteFile = (...args: string[]) => {
    let filepath = projectDir(...args);
    if(!fs.existsSync(filepath)) return;
    return fs.unlinkSync(filepath);
};
