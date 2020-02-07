import * as https from 'https';
import { IncomingMessage } from 'http';
import { rejects } from 'assert';
import { resolve } from 'dns';

export class HttpClient {
    
    public async get(url: string): Promise<IncomingMessage> {
        return new Promise((resolve, reject) => {
            https.get(url, (response) => {
                resolve(response);
            }).on('error', (err) => reject(err));
        });
    }

    public async getResponseBody(url: string): Promise<string> {
        const response = await this.get(url);
        return new Promise((resolve, reject) => {
            let data = '';
            response.on('data', (chunk) => data += chunk);
            response.on('end', () => resolve(data));
            response.on('error', (err) => reject(err));
        });
    }

}