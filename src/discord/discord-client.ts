import * as Discord from 'discord.js';
import { DiscordClientConfig } from './discord-client.config';

/** wrapper for discord interaction */
export class DiscordClient {

    private readonly _client: Discord.Client = new Discord.Client();

    constructor(private readonly _options: DiscordClientConfig) {}

    public async connect(): Promise<void> {
        await this._client.login(this._options.api_token);
    }

    public async post(message: string, channel_id: string): Promise<void> {
        const channel = this._client.channels.filter((channel, key) => channel.id == channel_id).first() as Discord.TextChannel;
        await channel.send(message);
    }
}
