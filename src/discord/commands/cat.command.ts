import { Command } from "./command";
import { Channel } from "discord.js";
import { HttpClient } from "../../http/http.client";

export class CatCommand implements Command {
    public readonly arguments: string[];
    public readonly channel: Channel;
    private readonly _httpClient: HttpClient = new HttpClient();

    constructor(args: string[], channel: Channel) {
        this.arguments = args;
        this.channel = channel;
    }

    public async getImageUrl(): Promise<string> {
        const response = await this._httpClient.getResponseBody('https://aws.random.cat/meow');
        const json = JSON.parse(response) as { file: string };
        return json.file;
    }

}