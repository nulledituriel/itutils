const { Message, MessageEmbed } = require("discord.js")

module.exports = {
    name : 'hextostring',
    description : 'tranlates hex do decimal',
    execute(client, message, args) {
        let hexString = args[0];

        function hexToString(str)
            {
                const buf = new Buffer.from(str, 'hex');
                return buf.toString('utf8');
            }

        let result = parseInt(hexString, 16);
        result = result.toString();

        if(result == 'NaN'){
            message.reply("your hexadecimal input is invalid!");
            return;
        }

        else{
            message.channel.send("Decimal output: " + "`" + result + "`" + "\nString output: " + "`" + hexToString(hexString) + "`");
        }
    }
}