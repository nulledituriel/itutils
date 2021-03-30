const { Message, MessageEmbed } = require('discord.js');
const config = require('../config.json');
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "dnslookup",
    description: "Returns the DNS lookup results",
    execute(client, message, args) {
        let date_ob = new Date();

        if(!args) {
            message.channel.send('Something went wrong!');
            return;
        }

        let dateNow = date_ob.getHours();

        request(`https://api.hackertarget.com/dnslookup/?q=${args[0]}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                fs.writeFile(`./dns_results/DNS Results - ${message.author.tag} - ${args[0]}.txt`, body, (error) => {
                    if (error) throw error;
                });

                const embed = new MessageEmbed().setTitle('DNS Lookup').setDescription(body)
                .setColor("#39d19c")
                .setThumbnail(client.user.displayAvatarURL())
				.setFooter('itUtils', client.user.displayAvatarURL());

                setTimeout(() => {
                    message.channel.send('DNS Lookup done:');
                    message.channel.send(embed);
                    message.channel.send({
                        files: [`./dns_results/DNS Results - ${message.author.tag} - ${args[0]}.txt`]
                    });
                }, 1000);
            }
            else {
                console.log("Error "+response.statusCode)
            }
        })
    }
}