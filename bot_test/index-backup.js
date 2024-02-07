// tests, dont worry about it
require('dotenv').config();
const { GatewayIntentBits } = require('discord.js');
const { CommandHandler } = require('djs-commander');

const path = require('path')
const { GBF } = require("gbfcommands");

const client = new GBF({
  AutoLogin: true,
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
})

new CommandHandler({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  textServer: '621493629868965908',
});

client.login(process.env.TOKEN);