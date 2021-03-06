import { Command } from "./command";
import { Channel } from "discord.js";
import { HttpClient } from "../../http/http.client";
import { DiscordClient } from "../discord-client";

export class DogCommand implements Command {
    
    public readonly arguments: string[];
    public readonly channel: Channel;
    private readonly _httpClient: HttpClient = new HttpClient();

    constructor(args: string[], channel: Channel){
        this.arguments = args;
        this.channel = channel;
    }

    public async getImageUrl(): Promise<string> {
        const response = await this._httpClient.getResponseBody('https://random.dog/woof');
        return `https://random.dog/${response}`;
    }

    public async execute(discord: DiscordClient): Promise<void> {
        await discord.post(await this.getImageUrl(), this.channel.id);
    }

}