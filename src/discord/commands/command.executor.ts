import { DiscordClient } from "../discord-client";
import { Command } from "./command";
import { NoopCommand } from "./noop.command";
import { GreetCommand } from "./greet.command";
import { HelpCommand } from "./help.command";

export class CommandExecutor  {
    constructor(private _discordClient: DiscordClient) { }

    public async execute(command: Command): Promise<void> {
        if(command instanceof NoopCommand)
            return;
        
        if(command instanceof GreetCommand)
            await this._discordClient.post(`Say hi to ${command.user.username}!`, command.channel.id);

        if(command instanceof HelpCommand)
            await this._discordClient.post(command.getHelpText(), command.channel.id);
    }
}