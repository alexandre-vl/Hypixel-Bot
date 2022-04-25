"use strict";

require("colors");

const { readdirSync } = require("fs");
const { Client, Collection } = require("discord.js");
const { token } = require("../config.json");
const client = new Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  retryLimit: Infinity,
});
client.interactions = new Collection();

const eventFiles = readdirSync("./src/events").filter((file) =>
  file.endsWith(".js")
);
for (const file of eventFiles) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);

  if (event.once) {
    client.once(eventName, (...args) => event.execute(client, ...args));
  } else {
    client.on(eventName, (...args) => event.execute(client, ...args));
  }
}

process.on("SIGINT", () => {
  console.log("Gracefully stopping bot...".bold.red);

  client.destroy();
  process.exit(0);
});

client.login(token);

module.exports = client;
