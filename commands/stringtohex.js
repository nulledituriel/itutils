const { Message, MessageEmbed } = require("discord.js")

module.exports = {
    name : 'stringtohex',
    description : 'converts a string into hexadecimal',
    execute(client, message, args) {

        function stringToHex(str) {
            //converting string into buffer
            let bufStr = Buffer.from(str, 'utf8');
        
            //with buffer, you can convert it into hex with following code
            message.channel.send("Hexadecimal output: `" + bufStr.toString('hex') + "`");
        }

        if(args[1]){
            var sentence = args.join(" ");
        
            stringToHex(sentence);
        }

        else{
            stringToHex(args[0]);
        }
    }
}