import * as Discord from "discord.js";
import { Command } from "../commands/command";

export interface MessageParseResult {
    command: Command;
    message: Discord.Message;
}