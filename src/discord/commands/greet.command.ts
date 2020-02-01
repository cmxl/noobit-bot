import { Command } from "./command";
import { User, Channel } from "discord.js";

export class GreetCommand implements Command {

    public readonly arguments: string[];
    public readonly user: User;
    public readonly channel: Channel;

    constructor(args: string[], user: User, channel: Channel) { 
        this.arguments = args;
        this.user = user;
        this.channel = channel;
    }
}