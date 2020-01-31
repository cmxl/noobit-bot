import { DiscordClient } from "./discord/discord-client";
import { ConfigurationManager } from "./configuration/configuration-manager";
import { DiscordClientConfig } from "./discord/discord-client.config";
import { TwitchConfig } from "./twitch/twitch-client.config";
import { TwitchClient } from "./twitch/twitch-client";

export class Program {
    public static async main(...args: string[]): Promise<void> {

        const configurationManager = new ConfigurationManager();
        const config = await configurationManager.load<DiscordClientConfig>('./config/discord.json');

        const discord = new DiscordClient(config);
        await discord.connect();
        await discord.post('Hallo Discord!', config.channel);

        const twitchConfig = await configurationManager.load<TwitchConfig>('./config/twitch.json');
        const twitch = new TwitchClient(twitchConfig);
        await twitch.connect();
    }
}