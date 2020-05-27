const config = require("../config.json");
const fs = require("fs");

module.exports = {
    name: "message",
    once: false,
    run(client, message) {
        if (message.author.bot || message.channel.type !== "text" || message.channel.type === "dm") return;

        const prefix = config.Servers[message.guild.id].Prefix;

        if(!message.content.startsWith(prefix)) {
            if(message.content.toLowerCase().includes("waw")) {
                let waws = config.Servers[message.guild.id].waws ? config.Servers[message.guild.id].waws : {};
                let waw = waws[message.author.id] ? waws[message.author.id] : 0;
                let totalWaw = config.Servers[message.guild.id].totalWaw ? config.Servers[message.guild.id].totalWaw : 0

                waw++;
                totalWaw++;
                waws[message.author.id] = waw;

                config.Servers[message.guild.id].waws = waws;
                config.Servers[message.guild.id].totalWaw = totalWaw;
                fs.writeFile("./config.json", JSON.stringify(config), (err) => console.log(err));

                if(config.Servers[message.guild.id].totalWaw%10 === 0) message.channel.send(`'waw' has been said \`${config.Servers[message.guild.id].totalWaw}\` times in **${message.guild.name}**, congrats **${message.author.username}**`)
            }

        } else {
            const args = message.content.slice(prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();
    
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) return
    
            if (command.args && !args.length) {
                let reply = `You didn't provide any arguments, ${message.author}`;
    
                if (command.usage) {
                    reply += `\nThe correct usage is: \`${prefix}${command.name} ${command.usage}\``;
                }
                return message.channel.send(reply);
            }
    
    
            try {
                command.admin 
                    ? client.elevation(message) 
                        ? command.run(message, args) 
                        : message.channel.send(`You don't have the permissions to use this command, ${message.author}`)
                    : command.run(message,args)
            } catch (error) {
                console.error(error);
                message.reply("There was an error trying to execute that command");
            }
        }
    },
};
