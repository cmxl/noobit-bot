import { Command } from "./command";
import { Channel } from "discord.js";
import { HttpClient } from "../../http/http.client";
import { DiscordClient } from "../discord-client";

export class CatCommand implements Command {
    public readonly arguments: string[];
    public readonly channel: Channel;
    private readonly _httpClient: HttpClient = new HttpClient();

    constructor(args: string[], channel: Channel) {
        this.arguments = args;
        this.channel = channel;
    }

    public async getImageUrl(): Promise<string> {
        const response = await this._httpClient.getResponseBody('https://api.thecatapi.com/v1/images/search');
        const json = JSON.parse(response) as { url: string }[];
        return json[0].url;
    }

    public async execute(discord: DiscordClient): Promise<void> {
        await discord.post(await this.getImageUrl(), this.channel.id);
    }
}