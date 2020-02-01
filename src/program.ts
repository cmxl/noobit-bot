import { DiscordClient } from "./discord/discord-client";
import { ConfigurationManager } from "./configuration/configuration-manager";
import { DiscordClientConfig } from "./discord/discord-client.config";
import { MessageParser } from "./discord/parsing/message.parser";
import { CommandExecutor } from "./discord/commands/command.executor";

export class Program {
    public static async main(...args: string[]): Promise<void> { 

        const configurationManager = new ConfigurationManager();      
        const config = await configurationManager.load<DiscordClientConfig>('./config/discord.json');
        const discord = new DiscordClient(config);
        const messageParser = new MessageParser();
        const commandExecutor = new CommandExecutor(discord);

        discord.setMessageCallback(async (message) => {
            const result = messageParser.parse(message);
            await commandExecutor.execute(result.command);
        });

        await discord.connect();
    }
}