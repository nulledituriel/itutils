const { Message } = require("discord.js")
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name : 'help',
    description : 'Returns the commands',
    execute(client, message, args) {

        const embed = new MessageEmbed()
        .setTitle('Commands')
        .setThumbnail(client.user.displayAvatarURL())
        .addField('Network Tools', `\r\n${config.prefix}ipinfo [ip address]\r\n${config.prefix}nmap [ip address / url]\r\n${config.prefix}dnslookup [url]\r\n${config.prefix}subnetlookup [ip address]\r\n${config.prefix}reversedns [ip address]\r\n${config.prefix}torip`)
        .addField('Other Tools', `\r\n${config.prefix}hextostring [hexadecimal input]\r\n${config.prefix}stringtohex [string]\r\n${config.prefix}dectohex [number]\r\n`)
        .setColor("#39d19c")
        .setFooter('itUtils', client.user.displayAvatarURL());
        
        message.channel.send(embed);
    }
}
