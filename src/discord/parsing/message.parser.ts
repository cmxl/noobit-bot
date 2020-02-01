import * as Discord from 'discord.js';
import { MessageParseResult } from './message.result';
import { Command } from '../commands/command';
import { NoopCommand } from '../commands/noop.command';
import { GreetCommand } from '../commands/greet.command';
import { HelpCommand } from '../commands/help.command';

export class MessageParser {

    private parseInternal(message: Discord.Message): Command {
        const content = message.content;
        if (!content.startsWith('!') || content.trim().length <= 1)
            return new NoopCommand();

        var params = content.substring(1, content.length).split(' ');
        const command = params.splice(0, 1)[0];
        const args = params;

        switch (command) {
            case 'greet':
                return new GreetCommand(args, message.author, message.channel);
            case 'help':
                return new HelpCommand(args, message.channel);
            default:
                return new NoopCommand();
        }
    }

    public parse(message: Discord.Message): MessageParseResult {
        const parsed = this.parseInternal(message);
        return { command: parsed, message };
    }
}