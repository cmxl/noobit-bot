import * as Discord from 'discord.js';

export interface DiscordClientOptions {
    token: string;
}

export class DiscordClient {

    private _client: Discord.Client = new Discord.Client();

    constructor(private readonly _options: DiscordClientOptions) {}

    public async connect(): Promise<void> {
        await this._client.login(this._options.token);
    }

    public async post(message: string, channel: string): Promise<void> {
        const c = this._client.channels.get(channel) as Discord.TextChannel;
        await c.send(message);
    }
}