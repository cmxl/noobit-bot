import { Command } from "./command";
import { User, Channel, Message, MessageMentions } from "discord.js";
import { DiscordClient } from "../discord-client";

export class GreetCommand implements Command {

    public readonly arguments: string[];
    public readonly user: User;
    public readonly channel: Channel;
    public readonly mentions: MessageMentions;

    constructor(args: string[], user: User, mentions: MessageMentions, channel: Channel) { 
        this.arguments = args;
        this.user = user;
        this.channel = channel;
        this.mentions = mentions;
    }

    public createMessage(): string {
        const mentions = this.buildUserMentions(this.mentions);
        return `${this.user.username} greets ${mentions}`;
    }

    private buildUserMentions(mentions: MessageMentions): string {
        const users = [...mentions.users.values()];
        if(users.length == 0)
            return '@everyone';

        if(users.length == 1)
            return `${users[0]}`;

        const allButLast = users.slice(0, users.length - 1);
        const last = users[users.length - 1];

        let usersText = allButLast.map(user => `${user}`).join(', ');
        usersText += ` and ${last}`;
        return usersText;
    }

    public async execute(discord: DiscordClient): Promise<void> {
        await discord.post(this.createMessage(), this.channel.id);
    }   

}