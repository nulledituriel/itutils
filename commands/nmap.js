const { Message, MessageEmbed } = require("discord.js")
const config = require('../config.json');
const request = require('request');
const fs = require('fs');

module.exports = {
    name : 'nmap',
    description : 'Returns the nmap results.',
    execute(client, message, args) {

        if(!args || args[0].length > 15 || args[0].length < 7) {
            message.channel.send('Something is wrong!');
            return;
        }

        if(args[0].startsWith('127.') || args[0].startsWith('192.') || args[0].startsWith('10.')) {
            message.channel.send('This ip is blacklisted!');
            return;
        } 

        request(`https://api.hackertarget.com/nmap/?q=${args[0]}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {

                fs.writeFile(`./nmap_results/Nmap Scan - ${message.author.tag} - ${args[0]}.txt`, body, (error) => {
                    if (error) throw error;
                });

                let bodyEmbed = body.split('Starting Nmap').join('*Starting Nmap');
                bodyEmbed = bodyEmbed.split('Host is up').join('Host is up*');
                bodyEmbed = bodyEmbed.split('Nmap done').join('*Nmap done');
                bodyEmbed = bodyEmbed.split('seconds').join('seconds*');
                bodyEmbed = bodyEmbed.split('PORT STATE SERVICE').join("**PORT STATE SERVICE**");
		
                const embed = new MessageEmbed().setTitle('Nmap scan').setDescription(bodyEmbed)
                .setColor("#39d19c")
                .setThumbnail(client.user.displayAvatarURL())
				.setFooter('itUtils', client.user.displayAvatarURL());

                message.channel.send('Nmap done:');
                message.channel.send(embed);
                message.channel.send({
                    files: [`./nmap_results/Nmap Scan - ${message.author.tag} - ${args[0]}.txt`]
                });
            }
            else {
                console.log("Error "+response.statusCode)
            }
        })
    }
}