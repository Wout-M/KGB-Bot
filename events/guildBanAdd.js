const { Servers } = require("../config.json");
const { MessageEmbed } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    name: "guildBanAdd",
    once: false,
    run(client, guild, user) {
        if(!Servers[guild.id].modChannelID && !client.channels.cache.get(Servers[guild.id].modChannelID)) return console.log(chalk.red("Configure a mod channel"))

        const banEmbed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL())
        .setTitle("Member banned")
        .setColor("#a10000")
        .setFooter("Created by the almighty ginger")
        .setTimestamp()
        .addField("User", `Tag: ${user.tag.toString()}\nID: ${user.id.toString()}`)

        client.channels.cache.get(Servers[guild.id].modChannelID).send(banEmbed);
        console.log(`${user.username} has been banned from ${guild.name} at ${new Date().toLocaleString()}`)
    }
}
