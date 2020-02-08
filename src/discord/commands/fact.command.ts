import { Command } from "./command";
import { DiscordClient } from "../discord-client";
import { Channel } from "discord.js";
import { HttpClient } from "../../http/http.client";
import * as crypto from 'crypto';
import { RNG } from "../../security/random";

interface Fact {
    id: string;
    url: string;
    factId: string;
    headline: string;
    shortHeadline: string;
    fact: string;
    fullStoryUrl: null;
    tags: string[];
    primaryImage: string;
    imageCredit: string;
}

export class FactCommand implements Command {
    public readonly arguments: string[];
    public readonly channel: Channel;

    constructor(args: string[], channel: Channel) {
        this.arguments = args;
        this.channel = channel;
    }

    private async loadFacts(): Promise<Fact[]> {
        const http = new HttpClient();
        const page = RNG.value(1, 10);
        const body = await http.getResponseBody(`https://www.mentalfloss.com/api/facts?page=${page}`);
        const facts = JSON.parse(body) as Fact[];
        return facts;
    }

    private async getRandomFact(): Promise<string> {
        const facts = await this.loadFacts();
        const index = RNG.value(0, facts.length - 1);
        return facts[index].fact;
    }

    public async execute(discord: DiscordClient): Promise<void> {
        await discord.post(await this.getRandomFact(), this.channel.id);
    }
}