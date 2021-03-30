const { Message } = require("discord.js")
const { MessageEmbed } = require('discord.js');
const config = require('../config.json');
const superagent = require('superagent');

module.exports = {
    name : 'ipinfo',
    description : 'Returns the informations on an ip',
    execute(client, message, args) {

        var color = "#39d19c";
        let messageArray = message.content.split(" ");
        let query = args.join(" ");
        async function ipinfos(){

            let ip = await superagent
            .get(`http://ip-api.com/json/${query}?fields=33292287`);
            
            let ipEmbed = new MessageEmbed()
            .setColor(color)
            .setTitle("IP Info")
            .setDescription(`Query = ${ip.body.query}\nStatus = ${ip.body.status}\n
            Continent = ${ip.body.continent}\nContinent Code = ${ip.body.continentCode}\nCountry = ${ip.body.country}\nCountry Code = ${ip.body.countryCode}\nRegion name = ${ip.body.regionName}\nRegion = ${ip.body.region}\nCity = ${ip.body.city}\nDistrict = ${ip.body.district}\nZip = ${ip.body.zip}\n Latitude / Longitude = ${ip.body.lat} / ${ip.body.lon}\n
            Timezone = ${ip.body.timezone}\nCurrency = ${ip.body.currency}\n
            ISP = ${ip.body.isp}\nORG = ${ip.body.org}\nAS = ${ip.body.as}\nAS name = ${ip.body.asname}\n
            Reverse DNS = ${ip.body.reverse}\nMobile = ${ip.body.proxy}\nHosting = ${ip.body.hosting}`)
            .setThumbnail(client.user.displayAvatarURL())    
            .setFooter('itUtils', client.user.displayAvatarURL());
            message.channel.send(ipEmbed)
        }
        ipinfos();
    }
}