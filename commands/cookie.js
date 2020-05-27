module.exports = {
    name: "cookie",
    category: "Fun",
    description: "Give a cookie to someone",
    aliases:["biscuit"],
    usage: "<user>",
    args:true,
    run(message, args) {
        if(message.mentions.users.size < 1) return message.reply('You must mention someone to give them a cookie');
        
        const user = message.mentions.users.first();
        if(user === message.author) return message.channel.send(`Are you really giving yourself a cookie, ${message.author}?`)
        message.channel.send(`${user}, ${message.author} gave you a cookie :cookie:`)
    }
}