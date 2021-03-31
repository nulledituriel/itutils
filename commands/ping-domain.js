const { Message, MessageEmbed } = require("discord.js")
const domainPing = require("domain-ping");

module.exports = {
    name : 'ping-domain',
    description : 'Checks if the mentionned domain is up or not!',
    execute(client, message, args) {
        let domain = args[0];

        domainPing(domain) // Insert the domain you want to ping
            .then((res) => {

                var isUp = new MessageEmbed()
                .setTitle('Domain is responding to ping requests!')
                .setThumbnail(client.user.displayAvatarURL())
                .addField(`"${domain}" is up!`, `Full logs from scan are aivable below.`); // Replace with your code

                message.channel.send(isUp);

                let isreturning = JSON.stringify(res);

                message.channel.send("```json\n" + isreturning.split(",").join(",\n") + "```");
            })
            .catch((error) => {

                var isDown = new MessageEmbed()
                .setTitle('Domain is not responding to ping requests!')
                .setThumbnail(client.user.displayAvatarURL())
                .addField(`"${domain}" seems to be down! :'(`, `Full logs from scan are aivable below.`); // Replace with your code

                let isreturning2 = JSON.stringify(error);

                message.channel.send(isDown);

                message.channel.send("```json\n" + isreturning2.split(",").join(",\n") + "```");
            });
    }
}