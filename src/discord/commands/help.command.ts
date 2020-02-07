import { Command } from "./command";
import { Channel } from "discord.js";
import { DiscordClient } from "../discord-client";

export class HelpCommand implements Command {
    public readonly arguments: string[];
    public readonly channel: Channel;

    constructor(args: string[], channel: Channel) {
        this.arguments = args;
        this.channel = channel;
    }

    public getHelpText(): string {
        return `You may try using following commands:
                !greet
                !help
                !cat
                !dog`;
    }

    public async execute(discord: DiscordClient): Promise<void> {
        await discord.post(this.getHelpText(), this.channel.id);
    }   

}