import * as Discord from 'discord.js';
import { DiscordClientConfig } from './discord-client.config';

/** wrapper for discord interaction */
export class DiscordClient {

    private readonly _client: Discord.Client = new Discord.Client();

    private _messageCallback: (message: Discord.Message) => void;

    constructor(private readonly _options: DiscordClientConfig) { }

    public async connect(): Promise<void> {
        await this._client.login(this._options.api_token);
        this._client.on('message', (message) => { if(this._messageCallback) this._messageCallback(message) });
    }

    public async post(message: string, channel_id: string): Promise<void> {
        const channel = this._client.channels.filter((channel, key) => channel.id == channel_id).first() as Discord.TextChannel;
        await channel.send(message);
    }

    public setMessageCallback(callback: (message: Discord.Message) => void): void {
        this._messageCallback = callback;
    }
}