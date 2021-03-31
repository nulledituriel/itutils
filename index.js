const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const nmap = require('node-nmap');
var http = require("https");
var socket = require('net').Socket();
var sleep = require('sleep');
const fs = require('fs');
const request = require('request');
const path = require("path");
const fetch = require('node-fetch');
const domainPing = require("domain-ping");

const config = require('./config.json');

const { exec } = require('child_process');
function Warn(msg) { var embed = new MessageEmbed().setTitle(msg).setColor('#CF9B10'); return embed; }
function isLetter(c) { return c.toLowerCase() != c.toUpperCase(); }

const client = new discord.Client();
client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
console.log(client.commands);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`); // voir cours ES6
  setInterval(async ()=>{
	  let textList = ['monitoring the Internet','stalking the network inputs','blacklisting IPs'];
	  var text = textList[Math.floor(Math.random() * textList.length)];
	  client.user.setActivity(text, { type: "PLAYING" })
    },6000) // milliseconds
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/); /* retire les espaces après le préfixe + met la suite dans un array [bla, bla, bla] */
    const command = args.shift().toLowerCase(); /* retrait des arguments pour ne garder que la commande*/

    if (!client.commands.has(command)) return;
    client.commands.get(command).execute(client, message, args);
});

client.login(config.token);

/* Vava Corporation - © 2020 */
