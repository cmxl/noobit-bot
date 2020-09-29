import * as Discord from 'discord.js';
import { timer } from '../utils/promise.extensions';
import { DiscordClientConfig } from './discord-client.config';

/** wrapper for discord interaction */
export class DiscordClient {

    private readonly _client: Discord.Client = new Discord.Client();

    private _messageCallback: (message: Discord.Message) => void;

    private getTextChannel(channelId: string): Discord.TextChannel {
        return this._client.channels.filter((channel, key) => channel.id == channelId).first() as Discord.TextChannel;
    }

    constructor(private readonly _options: DiscordClientConfig) { }

    public async connect(): Promise<void> {
        await this._client.login(this._options.api_token);
        this._client.on('message', (message) => this.onMessage(message));
        this._client.on('disconnect', (e) => this.onDisconnect());
        this._client.on('error', (err) => this.onError(err));
    }

    private async onDisconnect(): Promise<void> {
        console.info('DiscordClient got disconnected');
        console.info('Removing all eventlisteners');
        this._client.removeAllListeners();
        console.info('Trying to reconnect in 30 sec');
        await timer(30000);
        await this.connect();
    }

    private onError(err: Error): void {
        console.error(err);
    }

    private onMessage(message: Discord.Message): void {
        try {
            if (this._messageCallback) {
                this._messageCallback(message);
            }
        } catch (err) {
            console.error('Error while processing message', err);
        }
    }

    public async post(message: string, channelId: string): Promise<void> {
        const channel = this.getTextChannel(channelId);
        await channel.send(message);
    }

    public async postEmbed(embed: Discord.RichEmbed, channelId: string) {
        const channel = this.getTextChannel(channelId);
        await channel.send(embed);
    }

    public setMessageCallback(callback: (message: Discord.Message) => void): void {
        this._messageCallback = callback;
    }
}