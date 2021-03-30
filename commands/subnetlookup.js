const { Message, MessageEmbed } = require('discord.js');
const config = require('../config.json');
const request = require('request');
const fs = require('fs');

module.exports = {
    name: "subnetlookup",
    description: "Returns the subnet lookup results",
    execute(client, message, args) {
        let date_ob = new Date();

        if(!args) {
            message.channel.send('Something went wrong!');
            return;
        }

        let dateNow = date_ob.getHours();

        request(`https://api.hackertarget.com/subnetcalc/?q=${args[0]}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                fs.writeFile(`./subnet_results/Sub Results - ${message.author.tag} - ${args[0].split('/').join('~')}.txt`, body, (error) => {
                    if (error) throw error;
                });

                const embed = new MessageEmbed().setTitle('Subnet Lookup').setDescription(body)
                .setColor("#39d19c")
                .setThumbnail(client.user.displayAvatarURL())
				.setFooter('itUtils', client.user.displayAvatarURL());

                setTimeout(() => {
                    message.channel.send('Subnet Lookup done:');
                    message.channel.send(embed);
                    message.channel.send({
                        files: [`./subnet_results/Sub Results - ${message.author.tag} - ${args[0].split('/').join('~')}.txt`]
                    });
                }, 1000);
            }
            else {
                console.log("Error "+response.statusCode)
            }
        })
    }
}