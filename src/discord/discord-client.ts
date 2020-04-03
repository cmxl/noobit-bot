import * as Discord from 'discord.js';
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
        this._client.on('message', (message) => { if (this._messageCallback) this._messageCallback(message) });
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