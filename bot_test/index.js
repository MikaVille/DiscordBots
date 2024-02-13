require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const path = require('path')

// command tester

// Load replies from replies.json
const replies = JSON.parse(fs.readFileSync('replies.json', 'utf-8'));

let nine = 0;
const time = 2 * 60 * 1000; // 2 minutes
let target = Date.now();

client.on("ready", () => {
  console.log(`${client.user.tag} is ready!`);
  client.user.setActivity('league of legends');
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on('messageCreate', (message) => {
  if (message.content === 'hello') {
    message.reply('Hey!');
  }
})

client.on('messageCreate', (message) => {
  if (message.author.bot) return;
  const mess = message.content.trim().toLowerCase().split(/ +/g);
  // Check for "9" every 10th message, if there is a 9 in the 10th message it will display
  nine += 1;
  console.log('Nine counter : ' + nine);
  if (nine === 10 && message.content.includes("9")) {
    message.reply("https://youtu.be/tKaEVOsHFls");
    nine = 0;
  }
  else if(nine === 10){
    nine = 0;
  }
  //currently set to author id equals violet, mentioned user id currently set to jd(human)
  if (message.author.id === '1199124294572183552') {
    const mentionedUser = message.mentions.users.get('335861745027383302');
    if (mentionedUser && mess[2] !== undefined) {
      message.reply("I like what you're saying. Poggies");
    }
  }
});
client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const args = message.content.trim().toLowerCase().split(/ +/g);

  // Check for specific phrase
  if (args[1] === "fuck" && args[2] === "you") {
    message.reply("yes please");
  }
});

client.on('messageCreate', (message) => {
  const args = message.content.trim().toLowerCase().split(/ +/g);

  const garretCount = (message.garretCount || 0) + args.filter(arg => arg === "garret").length;

  if (garretCount >= 5) {

    const newMsg = args.map(arg => (arg === "garret" || arg === "charlie" ? "whore" : arg));
    const sentence = newMsg.join(' ');

    message.reply("I think you mean " + '"' + sentence + '"');
    console.log(garretCount);
    message.garretCount = 0; // Reset the count
  } else {
    message.garretCount = garretCount;
    console.log('Counter : ' + garretCount); // Update the count
  }
});

client.on('messageCreate', (message) => {
  // change channel id for this if u want it another server
  if (message.channel.id === '1197039230409523312') {
    const current = Date.now();
    if (current >= target + time) {
      const number = Math.floor(Math.random() * replies.reply.length);
      message.reply(replies.reply[number]);
      target = current;
    } else {
      const timeRemaining = (target + time) - current;
      console.log(`Time remaining: ${timeRemaining} milliseconds`);
    }
  }
});

client.login(process.env.TOKEN);