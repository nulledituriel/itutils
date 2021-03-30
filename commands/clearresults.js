const config = require('../config.json');
const { GuildMember, DiscordAPIError, Client } = require("discord.js");
const path = require("path");
const fs = require('fs');

module.exports = {
    name: "clearresults",
    description: "Deletes all the results files",
    execute(client, message, args){

        if (message.member.hasPermission("MANAGE_GUILD")) {

            message.reply("Do you really want to delete all the results files?");
        
            message.channel.awaitMessages(m => m.author.id == message.author.id,
            {max: 1, time: 30000}).then(collected => {
                if (collected.first().content.toLowerCase() == 'yes' || collected.first().content.toLowerCase() == 'Yes') {
                    
                    const directory1 = "./nmap_results";
                    var fileNb1 = 0;
                    fs.readdir(directory1, (err, files) => {
                        if (err) throw err;
                    
                        for (const file of files) {
                        fs.unlink(path.join(directory1, file), err => {
                            if (err) throw err;
                        });
                        fileNb1 = fileNb1 + 1;
                        }
                        message.channel.send("Deleted " + fileNb1 + " file(s) from " + directory1);
                    });

                    const directory2 = "./dns_results";
                    var fileNb2 = 0;
                    fs.readdir(directory2, (err, files) => {
                        if (err) throw err;
                    
                        for (const file of files) {
                        fs.unlink(path.join(directory2, file), err => {
                            if (err) throw err;
                        });
                        fileNb2 = fileNb2 + 1;
                        }
                        message.channel.send("Deleted " + fileNb2 + " file(s) from " + directory2);
                    });

                    const directory3 = "./subnet_results";
                    var fileNb3 = 0;
                    fs.readdir(directory3, (err, files) => {
                        if (err) throw err;
                    
                        for (const file of files) {
                        fs.unlink(path.join(directory3, file), err => {
                            if (err) throw err;
                        });
                        fileNb3 = fileNb3 + 1;
                        }
                        message.channel.send("Deleted " + fileNb3 + " file(s) from " + directory3);
                    });

                    const directory4 = "./reversedns_results";
                    var fileNb4 = 0;
                    fs.readdir(directory4, (err, files) => {
                        if (err) throw err;
                    
                        for (const file of files) {
                        fs.unlink(path.join(directory4, file), err => {
                            if (err) throw err;
                        });
                        fileNb4 = fileNb4 + 1;
                        }
                        message.channel.send("Deleted " + fileNb4 + " file(s) from " + directory4);
                    });
                }
                else {
                    message.channel.send("Operation canceled");
                    return;
                }
            });
        }
        else {
            message.reply("You don't have the permissions to do this");
            return;
        }

    }
}