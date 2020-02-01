import * as Twitch from 'tmi.js';
import { TwitchConfig } from './twitch-client.config';

/** wrapper for twitch interaction */
export class TwitchClient {

    private readonly _client: Twitch.Client;

    constructor(config: TwitchConfig) { this._client = new Twitch.Client(config); }

    public async connect(): Promise<void> {
        this._client.connect();
    }
}