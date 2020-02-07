import { Channel } from "discord.js";
import { DiscordClient } from "../discord-client";

export interface Command {
    arguments: string[];
    channel: Channel;
    execute(discord: DiscordClient): Promise<void> 
}