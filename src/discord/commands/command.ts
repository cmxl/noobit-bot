import { Channel } from "discord.js";

export interface Command {
    arguments: string[];
    channel: Channel;
}