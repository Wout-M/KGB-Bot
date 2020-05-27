const { Servers } = require("../config.json");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "waw",
    category: "Fun",
    description: "Show the amount of waw of this server",
    run(message, args) {
        let scores = "";
        let usernames = "";
        if(Servers[message.guild.id].waws){
            const waws = Object.entries(Servers[message.guild.id].waws)

            waws.sort(function(a, b) {
                return b[1] - a[1];
            });

            scores = waws.map(waw => `${waw[1].toString()}`).join('\n')
            usernames = waws.map(waw => `${message.guild.members.cache.get(waw[0]).user.username}`).join('\n')
        }

        const wawEmbed = new MessageEmbed()
            .setAuthor(message.client.user.username, message.client.user.avatarURL())
            .setTitle(`How waw is ${message.guild.name}`)
            .setDescription(`waw has been said ${Servers[message.guild.id].totalWaw ? Servers[message.guild.id].totalWaw : 0} times`)
            .setColor("#26a69a")
            .setFooter("Created by the almighty ginger")
            .setTimestamp()
            .addField("Scores", scores, true)
            .addField("Names", usernames, true)
        
        message.channel.send(wawEmbed)
    }
}