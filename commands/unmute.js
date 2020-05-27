module.exports = {
    name: "unmute",
    category: "Admin",
    description: "Unmute the mentioned user",
    usage: "<user>",
    args: true,
    admin: true,
    run(message, args) {
        if (message.mentions.users < 1)
            return message.channel.send(`You must mention someone to unmute, ${message.author}`);
        const user = message.mentions.users.first();

        message.channel
            .overwritePermissions([{
                id: user.id,
                allow: ["SEND_MESSAGES"],
            }])
            .then((updated) => {
                console.log(`Unmuted ${user.username} at ${new Date().toLocaleString()}`);
                message.channel.send(`${user.username} has been unmuted here`)
            })
            .catch((err) => console.log(err));
    },
};
