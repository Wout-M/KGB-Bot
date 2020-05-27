module.exports = {
    name: "mute",
    category: "Admin",
    description: "Mute the mentioned user",
    usage: "<user>",
    args: true,
    admin: true,
    run(message, args) {
        if (message.mentions.users < 1)
            return message.channel.send(`You must mention someone to mute, ${message.author}`);
        const user = message.mentions.users.first();

        message.channel
            .overwritePermissions([{
                id: user.id,
                deny: ["SEND_MESSAGES"],
            }])
            .then((updated) => {
                console.log(`Muted ${user.username} at ${new Date().toLocaleString()}`);
                message.channel.send(`${user.username} has been muted here`)
            })
            .catch((err) => console.log(err));
    },
};
