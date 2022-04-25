"use strict";

const { readdirSync } = require("fs");

module.exports = {
  once: true,
  execute: (client) => {
    console.log("Ready !!");
    if (typeof process.send === "function") process.send("ready");

    const { interactions, application } = client;

    const interactionFiles = readdirSync("./src/interactions").filter((file) =>
      file.endsWith(".js")
    );
    for (const file of interactionFiles) {
      const interaction = require(`../interactions/${file}`);
      interactions.set(interaction.data.name, interaction);
    }

    return application.commands?.set([...interactions.map((i) => i.data)]);
  },
};
