import { Command } from "./command";
import { Channel, MessageEmbed, Message, RichEmbed } from "discord.js";
import { DiscordClient } from "../discord-client";
import * as rss from 'rss-parser';


export class MedlanCommand implements Command {

    public readonly arguments: string[];
    public readonly channel: Channel;
    private static readonly _rssFeed: string = 'https://www.medlan.de/?feed=rss2';
    private readonly _parser = new rss();

    constructor(args: string[], channel: Channel) {
        this.arguments = args;
        this.channel = channel;
    }

    public async getLatestBlogEntry(): Promise<RichEmbed> {
        const feed = await this._parser.parseURL(MedlanCommand._rssFeed);
        const latestEntry = feed.items[0];

        return new RichEmbed()
            .setAuthor('Medlan')
            .setTitle(latestEntry.title)
            .setDescription(latestEntry.content)
            .setURL(latestEntry.link)
            .setTimestamp(latestEntry.pubDate && new Date(latestEntry.pubDate))
            .setFooter(`All information provided by the official Medlan RSS feed (${MedlanCommand._rssFeed})`);
    }

    public async execute(discord: DiscordClient): Promise<void> {
        const embed = await this.getLatestBlogEntry();
        await discord.postEmbed(embed, this.channel.id);
    }

}