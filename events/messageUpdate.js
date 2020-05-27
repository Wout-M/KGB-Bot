const { MessageEmbed } = require("discord.js");
const { Servers } = require("../config.json")

module.exports = {
    name: "messageUpdate",
    once: false,
    run (client, oldMessage, newMessage) {
        if (oldMessage.author.bot || oldMessage.channel.type !== "text" || oldMessage.channel.type === "dm" || oldMessage.content.toString() === newMessage.content.toString()) return;

        if(!Servers[oldMessage.guild.id].logChannelID && !client.channels.cache.get(Servers[oldMessage.guild.id].logChannelID)) return oldMessage.channel.send("Configure a log channel");

        const editEmbed = new MessageEmbed()
            .setAuthor(client.user.username, client.user.avatarURL())
            .setTitle("Message edited")
            .setColor("#1565c0")
            .setFooter("Created by the almighty ginger")
            .setTimestamp()
            .addField("Time edited", newMessage.editedAt.toLocaleString())
            .addField("Time original", oldMessage.createdAt.toLocaleString())
            .addField("Channel", oldMessage.channel.name.toString())
            .addField("Author", oldMessage.author.tag.toString());
        
        if (oldMessage.content) editEmbed.addField("Old message", oldMessage.content.length > 1024 ? "This message is too long" :  oldMessage.content.toString())
        if (newMessage.content) editEmbed.addField("New message", newMessage.content.length > 1024 ? "This message is too long" :  newMessage.content.toString())

        if(oldMessage.attachments.array().length !== 0) oldMessage.attachments.array().map(attachment => editEmbed.addField("Attachment", attachment.url.toString())) 

        client.channels.cache.get(Servers[oldMessage.guild.id].logChannelID).send(editEmbed);
    }
}