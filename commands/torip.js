var tr = require('tor-request');
const { Message, MessageEmbed } = require('discord.js');
var exec = require('child_process').execFile;

module.exports = {
    name : 'torip',
    description : 'Shows your public ip using tor network',
    execute(client, message, args) {

        exec('./Tor/tor.exe', function(err, data) {  
            if(err) console.log(err);                      
        });

        setTimeout(() => {
            message.reply("I'm starting tor network...");
        }, 500);

        setTimeout(() => {
            tr.request('https://api.ipify.org', function (err, res, body) {
                if (!err && res.statusCode == 200) {
                    message.channel.send("Your public (through Tor) IP is: " + body);
                }
                else{
                    console.log(err);
                }
            });
        }, 5000);
    }
}