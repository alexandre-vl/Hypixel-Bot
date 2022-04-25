const db = require("quick.db");
const HypixelAPI = require("hypixel-api");
const clienth = new HypixelAPI("72ab4242-1b12-4d62-a9aa-de8896bb4b36");

module.exports = {
  data: {
    name: "unlink",
    description: "UnLink your Discord account to your Hypixel Account",
  },
  execute: async (interaction) => {
    const username = interaction.options.getString("username");
    // console.log(interaction)
    if (!db.get("linked-account")) {
      return interaction.reply({
        content: `Vous n'avez pas link votre compte ! \`/link <username>\` pour link votre compte.`,
        ephemeral: true,
      });
    }
    let verif = false;

    for (let i = 0; i < db.get("linked-account").length; i++)
      if (db.get("linked-account")[i].id === interaction.user.id) {
        db.delete("linked-account"[i]);
        interaction.reply({
          content:
            "Vous venez de unlink votre compte Hypixel de votre compte Discord",
          ephemeral: true,
        });
        return (verif = true);
      }

    if (verif === false) {
      return interaction.reply({
        content: `Vous n'avez pas link votre compte ! \`/link <username>\` pour link votre compte.`,
        ephemeral: true,
      });
    }
  },
};
