const { MessageAttachment } = require("discord.js");

module.exports = {
    name: "shoot",
    category: "Fun",
    description: "Shoot someone",
    usage: "<user>",
    args: true,
    run(message, args) {
        if(message.mentions.users.size < 1) return message.reply('You must mention someone to shoot them');

        const user = message.mentions.users.first();
        let gif = new MessageAttachment("https://media.giphy.com/media/hbtN4wlbTyEla/giphy.gif");
        let text = `${user}, ${message.author.username.toString()} shot you`
        if(user === message.author) {
            text = `${user} shot themselves`
            gif = new MessageAttachment('https://media.giphy.com/media/jSxK33dwEMbkY/giphy.gif');
        }
        message.channel.send(text,  gif)
    }
}