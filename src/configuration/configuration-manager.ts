import * as fs from 'fs';
import { Configuration } from './configuration';

export class ConfigurationManager {

    public async load<T>(file: string): Promise<T> {
        return new Promise(async (resolve, reject) => {
            fs.readFile(file, (err, buffer) => {

                if (err != null) {
                    reject(err);
                    return;
                }
                
                const json = buffer.toString('utf-8');
                const config = JSON.parse(json);
                resolve(config as T);
            });
        });
    }
}