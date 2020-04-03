import * as Discord from 'discord.js';
import { MessageParseResult } from './message.result';
import { Command } from '../commands/command';
import { NoopCommand } from '../commands/noop.command';
import { GreetCommand } from '../commands/greet.command';
import { HelpCommand } from '../commands/help.command';
import { CatCommand } from '../commands/cat.command';
import { DogCommand } from '../commands/dog.command';
import { FactCommand } from '../commands/fact.command';
import { MedlanCommand } from '../commands/medlan.command';

export class MessageParser {

    private parseInternal(message: Discord.Message): Command {
        const content = message.content;
        if (!content.startsWith('!') || content.trim().length <= 1)
            return new NoopCommand();

        var params = content.substring(1, content.length).split(' ');
        const command = params.splice(0, 1)[0];
        const args = params;

        console.debug(content, command, args);
        switch (command) {
            case 'greet':
                return new GreetCommand(args, message.author, message.mentions, message.channel);
            case 'meow':
                return new CatCommand(args, message.channel);
            case 'medlan':
                return new MedlanCommand(args, message.channel);
            case 'woof':
                return new DogCommand(args, message.channel);
            case 'help':
                return new HelpCommand(args, message.channel);
            case 'fact':
                return new FactCommand(args, message.channel);
            default:
                return new NoopCommand();
        }
    }

    public parse(message: Discord.Message): MessageParseResult {
        const parsed = this.parseInternal(message);
        return { command: parsed, message };
    }
}