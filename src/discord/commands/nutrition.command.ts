import { Command } from "./command";
import { Channel } from "discord.js";
import { DiscordClient } from "../discord-client";
import { HttpClient } from "../../http/http.client";

const API_KEY = '70a97257f4131c169d9a3e6986311559';
const APP_ID = '4974e32f';

export class NutritionCommand implements Command {
    public readonly arguments: string[];
    public readonly channel: Channel;
    private readonly _httpClient: HttpClient = new HttpClient();

    constructor(args: string[], channel: Channel) {
        this.arguments = args;
        this.channel = channel;
    }

    public async getNutritions(): Promise<{ name: string, calories: number }> {
        const url = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${this.arguments.join(',')}`;
        const response = await this._httpClient.getResponseBody(url);
        console.warn(url);
        console.debug(response);
        const result = JSON.parse(response) as NutritionResult;
        return {
            name: result.parsed[0].food.label,
            calories: result.parsed[0].food.nutrients['ENERC_KCAL']
        };
    }

    public async execute(discord: DiscordClient): Promise<void> {
        const result = await this.getNutritions()
        await discord.post(`100g of ${result.name} has ${result.calories} kcal`, this.channel.id);
    }
}

interface NutritionResult {
    text: string;
    parsed: { food: Food }[];
    hints: Hint[];
    _links: { [key: string]: { title: string, href: string }}
}

interface Food {
    foodId: string;
    uri: string;
    label: string;
    nutrients: { [key: string]: number };
    category: string;
    categoryLabel: string;
}

interface Hint {
    food: Food;
    measures: Measure[];
}

interface Measure {
    uri: string;
    label: string;
}