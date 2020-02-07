import { DiscordClient } from "./discord/discord-client";
import { ConfigurationManager } from "./configuration/configuration-manager";
import { DiscordClientConfig } from "./discord/discord-client.config";
import { MessageParser } from "./discord/parsing/message.parser";

export class Program {
    public static async main(...args: string[]): Promise<void> { 

        const configurationManager = new ConfigurationManager();      
        const config = await configurationManager.load<DiscordClientConfig>('./config/discord.json');
        const discord = new DiscordClient(config);
        const messageParser = new MessageParser();

        discord.setMessageCallback(async (message) => {
            const result = messageParser.parse(message);
            await result.command.execute(discord);
        });

        await discord.connect();
    }
}