import { DiscordClient } from "./discord-client";

class Main {
    public static async run(...args: string[]): Promise<void> {
        const discord = new DiscordClient({token: 'my-token'});
        await discord.connect();
        await discord.post('Hallo Discord!', '#test-channel');
    }
}

Main.run();