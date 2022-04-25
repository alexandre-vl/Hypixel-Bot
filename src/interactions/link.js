const db = require("quick.db");
const HypixelAPI = require("hypixel-api");
const clienth = new HypixelAPI("72ab4242-1b12-4d62-a9aa-de8896bb4b36");

module.exports = {
  data: {
    name: "link",
    description: "Link your Discord account to Hypixel Account",
    options: [
      {
        name: "username",
        description: "Your name in minecraft",
        type: "STRING",
        required: true,
      },
    ],
  },
  execute: async (interaction) => {
    const username = interaction.options.getString("username");
    // console.log(interaction)
    if (!db.get("linked-account")) {
      interaction.reply(
        `Vous venez de lié votre compte Discord \`${interaction.user.tag}\` à votre compte minecraft **${username}**`
      );
      return db.push("linked-account", {
        mc: username,
        id: interaction.user.id,
      });
    }
    let verif = false;
    db.get("linked-account").forEach((e) => {
      if (e.id === interaction.user.id) {
        interaction.reply({
          content:
            "Vous avez déjà lié votre compte ! `/unlink` Pour reset votre link",
          ephemeral: true,
        });
        return (verif = true);
      }
      if (e.mc === interaction.options.getString("username")) {
        interaction.reply({
          content: "Ce compte est déjà lié.",
          ephemeral: true,
        });
        return (verif = true);
      }
    });
    if (verif === false) {
      await clienth
        .getPlayer("name", interaction.options.getString("username"))
        .then(async (player) => {
          verif = false;
          console.log(player);
          db.push("linked-account", { mc: username, id: interaction.user.id });
          return interaction.reply(`**${username}**`);
        })
        .catch((err) => {
          return interaction.reply({
            content: `Erreur : \`${err}\``,
            ephemeral: true,
          });
        });
    }
  },
};
