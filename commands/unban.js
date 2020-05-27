module.exports = {
    name: "unban",
    category: "Admin",
    description: "Unban the mentioned user",
    usage: "<user_id>",
    args: true,
    admin: true,
    run(message, args) {        
        const user = message.client.users.cache.get(args[0])
        user ? message.guild.members.unban(user.id).then(() => message.channel.send(`Unbanned ${user.username}`)).catch((err) => console.log(err)) : message.channel.send(`You must supply a valid user id, ${message.author}`)
    }
}