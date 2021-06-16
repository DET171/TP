require('events').EventEmitter.defaultMaxListeners = 15;
const fs = require('fs');
const Discord = require("discord.js");
require('dotenv').config();
const client = new Discord.Client();
const https = require('https');
const Enmap = require('enmap');
const got = require('got');
const DIG = require('discord-image-generation');
const { GiveawaysManager } = require('discord-giveaways');
const ms = require('ms');

const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    updateCountdownEvery: 10000,
    hasGuildMembersIntent: false,
    default: {
        botsCanWin: false,
        exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});

client.giveawaysManager = manager;






client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();




console.log("Loading command files...")
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		console.log(command.name);
	}
}








// I attach settings to client to allow for modular bot setups
// In this example we'll leverage fetchAll:false and autoFetch:true for
// best efficiency in memory usage. We also have to use cloneLevel:'deep'
// to avoid our values to be "reference" to the default settings.
// The explanation for why is complex - just go with it.
client.settings = new Enmap({
  name: "conf",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

const defaultConf = {
	ownerRole: "Not Set",
	coownerRole: "Not Set",
	adminRole: "Administrator",
	modRole: "Moderator",
  adminRole: "Administrator",
	prefix: "sus ",
}

client.on("ready", () => {
  console.log("Logged in as " + client.user.tag);
  const express = require('express');
  const app = express();
  const Pport = 8000;

  app.get('/', (req, res) => res.send(`Serving as ${client.user.tag} <br> You can invite me at <a href="https://discord.com/api/oauth2/authorize?client_id=853206803219480606&permissions=2048&scope=bot">https://discord.com/api/oauth2/authorize?client_id=853206803219480606&permissions=2048&scope=bot<a><br>You can invite my brother at <a href="https://discord.com/oauth2/authorize?client_id=848166639367094302&permissions=4294967287&scope=bot%20applications.commands">https://discord.com/oauth2/authorize?client_id=848166639367094302&permissions=4294967287&scope=bot%20applications.commands</a>`));

  app.listen(Pport, () => console.log(`Example app listening at http://localhost:${Pport}`));
    client.user.setActivity('YOU', { type: 'WATCHING' })
});


client.on("guildDelete", guild => {
  client.settings.delete(guild.id);
});












client.on("message", async message => {
  // Exit and stop if it's not there

	console.log(`\nCHATLOGS - [${message.guild}] ${message.author.tag}: ${message.content}`);

	if (!message.guild) return;
	const guildConf = client.settings.ensure(message.guild.id, defaultConf);
	let prefix = guildConf.prefix;

  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();









if(commandName === "setconf") {

	if(!message.member.hasPermission('MANAGE_SERVER')) {
		return message.reply("You do not have `Manage Server` permissions, sorry!");
	}
	const [prop, ...value] = args;
	if(!client.settings.has(message.guild.id, prop)) {
		return message.reply("This key is not in the configuration.");
	}
	client.settings.set(message.guild.id, value.join(" "), prop);
	message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);

}





  // Now let's make another command that shows the configuration items.
  if(commandName === "showconf") {
    let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}  :  ${guildConf[prop]}\n`;
    });
    message.channel.send(`The following are the server's current configuration:
    \`\`\`${configProps}\`\`\``);
  }









	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (command.args && !args.length) {
		let reply = 'You didn\'t provide any arguments, <@!' + message.author + '> !';
		if (command.usage) {
			reply += '\nThe proper usage would be: `' + prefix + command.name + ' ' + command.usage + '`';
		}
	return message.channel.send(reply);
	}




	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const cdembed = new Discord.MessageEmbed().setTimestamp().setColor('DARK_BLUE');
			const timeLeft = (expirationTime - now) / 1000;
			cdembed.setTitle('Hey slow it down there').setDescription(`The default cooldown for this command is \`${cooldownAmount} ms\` \n  Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			return message.channel.send(cdembed);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);





	try {
		command.execute(message, args, prefix, client);
    }
		 catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
		message.channel.send('```' + error + '```');
	}

});




client.login();
