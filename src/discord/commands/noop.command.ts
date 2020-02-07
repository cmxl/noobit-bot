import { Command } from "./command";
import { Channel } from "discord.js";
import { DiscordClient } from "../discord-client";

export class NoopCommand implements Command {
    arguments: string[];
    channel: Channel;

    public async execute(discord: DiscordClient): Promise<void> {
        return Promise.resolve();
    }   
}