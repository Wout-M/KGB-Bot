const { MessageEmbed } = require("discord.js");
const { Servers } = require("../config.json");

module.exports = {
    name: "kick",
    category: "Admin",
    description: "Ban the mentioned user with a given reason",
    usage:"<user> <reason>",
    args: true,
    admin: true,
    run(message, args) {
        if(!Servers[message.guild.id].modChannelID && !message.client.channels.cache.get(Servers[message.guild.id].modChannelID)) return message.channel.send("Configure a mod channel")
        
        if(message.mentions.users < 1) return message.channel.send(`You must mention someone to kick, ${message.author}`)
        const user = message.mentions.users.first();

        const reason = args.slice(1).join(' ').toString();
        if(reason.length < 1) return message.channel.send(`You must give a valid reason to kick someone, ${message.author}`);

        if(!message.guild.members.cache.get(user.id).kickable) return message.reply(`${user.tag.toString()} could not be kicked`);
        message.guild.members.cache.get(user.id).kick(reason);
    
        const kickEmbed = new MessageEmbed()
        .setAuthor(message.client.user.username, message.client.user.avatarURL())
        .setTitle("Member kicked")
        .setColor("#5e35b1")
        .setFooter("Created by the almighty ginger")
        .setTimestamp()
        .addField("Mod", message.author.tag.toString())
        .addField("User", `Tag: ${user.tag.toString()}\nID: ${user.id.toString()}`)
        .addField("Reason", reason);

        message.client.channels.cache.get(Servers[message.guild.id].modChannelID).send(kickEmbed);
        console.log(`${user.tag.toString()} has been kicked from ${message.guild.name} at ${new Date().toLocaleString()}`)
    }
}