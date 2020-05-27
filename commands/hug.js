const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "hug",
    category: "Fun",
    description: "Give someone a hug",
    usage: "<user>",
    args: true,
    run(message, args) {
        if(message.mentions.users.size < 1) return message.reply('You must mention someone to hug them');

        const user = message.mentions.users.first();
        const gif = new MessageAttachment("https://media.giphy.com/media/RPyUPymjO4YJa/giphy.gif");
        let text = `${user}, ${message.author.username.toString()} gave you a hug`
        if(user === message.author) text = `${user} gave themselves a hug`
        message.channel.send(text,  gif)
    }
}