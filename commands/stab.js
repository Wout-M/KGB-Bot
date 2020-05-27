const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "stab",
    category: "Fun",
    description: "Stab someone",
    usage: "<user>",
    args: true,
    run(message, args) {
        if(message.mentions.users.size < 1) return message.reply('You must mention someone to stab them');

        const user = message.mentions.users.first();
        let gif = new MessageAttachment("https://media.giphy.com/media/3oz8xuc42mJ9xah6lq/giphy.gif");
        let text = `${user}, ${message.author.username.toString()} stabbed you`
        if(user === message.author) {
            text = `${user} stabbed themselves`
            gif = new MessageAttachment("https://media.giphy.com/media/l2JeiuwmhZlkrVOkU/giphy.gif");
        }
        message.channel.send(text,  gif)
    }
}