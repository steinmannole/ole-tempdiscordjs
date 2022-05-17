const Discord = require("discord.js");
const client = new Discord.Client({intents: 32767});
const { DiscordTogether } = require('discord-together');
const { TokenDev, TokenLive } = require("./config.json");

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

// Discord Together Addon
client.discordTogether = new DiscordTogether(client);

// Register a new main channel
tempChannels.registerChannel("31321313", {
    childCategory: "1231231",
    childAutoDeleteIfEmpty: true,
    childFormat: (member, count) => `⌛ | ${member.user.username}`
});

// Discord Together Addon - Watch2Gether Plugin
client.once('messageCreate', async message => {
  if (message.content === '!yt' || '!YT' || '!Yt') {
      if(message.member.voice.channel) {
        client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {
          return message.channel.send(`${invite.code}`);
        });
      };
  };
});

// Ready Messages
client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag} - SUCCESS ✓`);
    console.info(`Discord Together - SUCCESS ✓`);
    console.info(`Temp Channel - SUCCESS ✓`);
    console.warn(`Running ...`);
  })

// !!! Use only One !!! //
// DEV Login
client.login(TokenDev);

// LIVE Login
//client.login(TokenLive);