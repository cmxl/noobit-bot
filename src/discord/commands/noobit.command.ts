import { Channel } from "discord.js";
import { DiscordClient } from "../discord-client";
import { Command } from "./command";
import { BlogCommand } from "./noobit/blog.command";
import { SongCommand } from "./noobit/song.command";
import { NoopCommand } from "./noop.command";

export class NoobitCommand implements Command {
    public readonly arguments: string[];
    public readonly channel: Channel;

    constructor(args: string[], channel: Channel) {
        this.arguments = args;
        this.channel = channel;
    }

    private parseArguments(args: string[]): Command {

        if(args == null || args.length <= 0)
            return new NoopCommand();
        
        switch(args[0]) {
            case 'blog':
                return new BlogCommand(args.slice(1), this.channel);
            case 'song':
                return new SongCommand(args.slice(1), this.channel);
            default:
                return new NoopCommand();
        }
    }

    public async execute(discord: DiscordClient): Promise<void> {
        const command = this.parseArguments(this.arguments);
        await command.execute(discord);
    }   
}