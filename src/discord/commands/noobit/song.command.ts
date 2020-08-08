import { Channel, RichEmbed } from "discord.js";
import { HttpClient } from "../../../http/http.client";
import { DiscordClient } from "../../discord-client";
import { Command } from "../command";

interface Song {
    id: string;
    name: string;
    listens: number;
    releaseDate: Date;
}

export class SongCommand implements Command {
    public readonly arguments: string[];
    public readonly channel: Channel;
    private static readonly _baseUrl: string = `https://noobit.org`;
    private static readonly _apiUrl: string = `${SongCommand._baseUrl}/api`;

    constructor(args: string[], channel: Channel) {
        this.arguments = args;
        this.channel = channel;
    }

    public async execute(discord: DiscordClient): Promise<void> {

        if (this.arguments.length <= 0)
            return;

        try {
            const http = new HttpClient();
            const response = await http.getResponseBody(`${SongCommand._apiUrl}/music/song?m=${this.arguments[0]}`);

            if(response == null)
                return;

            const song = JSON.parse(response) as Song;
            const embed = new RichEmbed()
                .setAuthor('cmxl')
                .setTitle(song.name)
                .setURL(`${SongCommand._baseUrl}/music?m=${song.id}`)
                .setTimestamp(song.releaseDate)
                .setFooter(`This song has been downloaded ${song.listens} times.`);

            await discord.postEmbed(embed, this.channel.id);
        } catch (err) { 
            console.error(err); 
        }
    }
}