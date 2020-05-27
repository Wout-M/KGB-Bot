module.exports = {
    name: "ban",
    category: "Admin",
    description: "Ban the mentioned user with a given reason",
    usage: "<user> <reason>",
    args: true,
    admin: true,
    run(message, args) {        
        if(message.mentions.users < 1) return message.channel.send(`You must mention someone to ban, ${message.author}`)
        const user = message.mentions.users.first();

        const reason = args.slice(1).join(' ').toString();
        if(reason.length < 1) return message.channel.send(`You must give a valid reason to ban someone, ${message.author}`);

        if(!message.guild.members.cache.get(user.id).bannable) return message.reply(`${user.tag.toString()} could not be banned`);
        message.guild.members.cache.get(user.id).ban({reason: reason})
    }
}