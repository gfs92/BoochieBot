// Require the necessary discord.js classes
const {
  Client,
  Events,
  GatewayIntentBits,
  PermissionFlagsBits,
} = require("discord.js");
require("dotenv").config();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  setInterval(changeAdmin, 3600000);
});
const guildId = "617072949245116436"; //Discord Server ID
const adminRoleId = "705094003279790120"; //Role ID for admin
async function changeAdmin() {
  const guild = await client.guilds.fetch(guildId);
  if (!guild) {
    console.error(`Unable to fetch guild with ID ${guildId}`);
    return;
  }
  const boochieId = "237302256972726282"; //User id to change roles for
  const member = await guild.members.fetch(boochieId);
  if (!member) {
    console.error(`Unable to fetch member with ID ${boochieId}`);
    return;
  }
  const hasAdmin = member.roles.cache.has(adminRoleId);
  try {
    if (hasAdmin) {
      await member.roles.remove(adminRoleId);
      console.log(`Removed role for ${member.user.tag}`);
    } else {
      await member.roles.add(adminRoleId);
      console.log(`Added role for ${member.user.tag}`);
    }
  } catch (error) {
    console.error(`Error changing roles: ${error.message}`);
  }
}

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
