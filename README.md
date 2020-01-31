# Typescript Showcase

Typescript implementation for a discord bot posting messages in configured channels and also connecting to a Twitch stream.

## Build

* npm install
* go to the `dist` folder and create folder `config`
  * place `discord.json` file providing at least the `api_token` property from `DiscordConfig.ts` definition.
  * place `twitch.json` file providing properties from `TwitchConfig.ts` definition.
* npm start
