import { Command } from "./command";
import { Channel } from "discord.js";

export class NoopCommand implements Command {
    arguments: string[];
    channel: Channel;
}