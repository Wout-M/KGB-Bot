const { Servers } = require("../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "check",
    category: "Admin",
    description: "Check if the mod role & channel are configured",
    admin: true,
    run(message, args) {
        const helpEmbed = new MessageEmbed()
            .setColor("#43a047")
            .setAuthor(
                message.client.user.username,
                message.client.user.avatarURL()
            )
            .setTitle("Check mod role, mod & log channel")
            .setFooter("Created by the almighty ginger")
            .setTimestamp();
        const server = Servers[message.guild.id];

        message.guild.roles.cache.find((role) => role.id === server.modRoleID)
            ? helpEmbed.addField("Mod role",`\`${message.guild.roles.cache
                      .find((role) => role.id === server.modRoleID)
                      .name.toString()}\``
              )
            : helpEmbed.addField("Mod role", "No role has been configured").setColor("#d50000");
        
        message.guild.channels.cache.find((channel) => channel.id === server.modChannelID)
            ? helpEmbed.addField("Mod channel", `\`${message.guild.channels.cache
                .find((channel) => channel.id === server.modChannelID)
                .name.toString()}\``
            )
            : helpEmbed.addField("Mod channel", "No channel has been configured").setColor("#d50000");
                        
        message.guild.channels.cache.find((channel) => channel.id === server.logChannelID)
            ? helpEmbed.addField("Log channel", `\`${message.guild.channels.cache
                .find((channel) => channel.id === server.logChannelID)
                .name.toString()}\``
            )
            : helpEmbed.addField("Log channel", "No channel has been configured").setColor("#d50000");

        message.channel.send(helpEmbed);
    }
};
