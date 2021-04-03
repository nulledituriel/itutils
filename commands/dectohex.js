const { Message, MessageEmbed } = require("discord.js")

module.exports = {
    name : 'dectohex',
    description : 'converts a decimal into hexadecimal',
    execute(client, message, args) {

        var toConvert = parseInt(args[0]);

        hexString = toConvert.toString(16);

        message.channel.send("Hexadecimal output: `" + hexString + "`");

    }
}