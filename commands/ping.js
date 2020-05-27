module.exports = {
    name: "ping",
    category: "Utility",
    description: "Pong!",
    run(message, args) {
        message.channel.send("Que?")
            .then(msg => msg.edit(`Pong: \`${msg.createdTimestamp - message.createdTimestamp} ms\``))
    }
}