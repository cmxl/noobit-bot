import { Channel } from "discord.js";
import { HttpClient } from "../../../http/http.client";
import { DiscordClient } from "../../discord-client";
import { Command } from "../command";

interface Blog {
    id: string;
    name: string;
    description: string;
    seoName: string;
}

interface Topic {
    id: string;
    name: string;
    seoName: string;
    blog: Blog;
}

interface Post {
    id: string;
    title: string;
    description: string;
    markdown: string;
    date: Date;
    topic: Topic;
    seoTitle: string;
}

export class BlogCommand implements Command {
    public readonly arguments: string[];
    public readonly channel: Channel;
    private static readonly _baseUrl: string = `https://noobit.org`;
    private static readonly _apiUrl: string = `${BlogCommand._baseUrl}/api`;

    constructor(args: string[], channel: Channel) {
        this.arguments = args;
        this.channel = channel;
    }

    private getUrl(post: Post): string {
        return `${BlogCommand._baseUrl}/blog/${post.topic.blog.seoName}/${post.topic.seoName}/${post.seoTitle}`;
    }

    public async execute(discord: DiscordClient): Promise<void> {

        if (this.arguments.length <= 0)
            return;

        try {
            const http = new HttpClient();
            const response = await http.getResponseBody(`${BlogCommand._apiUrl}/blog/${this.arguments[0]}/latest`);
            const post = JSON.parse(response) as Post;
            await discord.post(this.getUrl(post), this.channel.id);
        } catch (err) { 
            console.error(err); 
        }
    }
}