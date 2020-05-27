const { MessageEmbed } = require("discord.js");
const { Servers } = require("../config.json")

module.exports = {
    name: "messageDelete",
    once: false,
    run (client, message) {
        if (message.author.bot || message.channel.type !== "text" || message.channel.type === "dm") return;

        if(!Servers[message.guild.id].logChannelID && !client.channels.cache.get(Servers[message.guild.id].logChannelID)) return message.channel.send("Configure a log channel");

        const deleteEmbed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.avatarURL())
            .setTitle("Message deleted")
            .setColor("#4DAF7E")
            .setFooter("Created by the almighty ginger")
            .setTimestamp()
            .addField("Time", message.createdAt.toLocaleString())
            .addField("Channel", message.channel.name.toString())
            .addField("Author", message.author.tag.toString());
        
        if (message.content) deleteEmbed.addField("Message", message.content.length > 1024 ? "This message is too long" :  message.content.toString())

        if(message.attachments.array().length !== 0) message.attachments.array().map(attachment => deleteEmbed.addField("Attachment", attachment.url.toString())) 

        client.channels.cache.get(Servers[message.guild.id].logChannelID).send(deleteEmbed);
    }
}