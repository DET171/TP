require('events').EventEmitter.defaultMaxListeners = 15;
const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const db = require('quick.db');
const prefix = "sus ";

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();


console.log('Loading command files...');
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		console.log(command.name);
	}
}




client.on('ready', async () => {
	console.log('Logged in as ' + client.user.tag);
	const express = require('express');
	const channel = await client.channels.fetch('855271120567926814');
	channel.send('Started up.');
	setInterval (function () {
		channel.send('I\'m up!')
			.catch(console.error);
	}, 270000);
	const app = express();
	const Pport = 8000;

	app.get('/', (req, res) => res.send(`Serving as ${client.user.tag} <br> You can invite me at <a href="https://discord.com/api/oauth2/authorize?client_id=853206803219480606&permissions=4294967287&scope=bot">https://discord.com/api/oauth2/authorize?client_id=853206803219480606&permissions=4294967287&scope=bot<a><br>You can invite my brother at <a href="https://discord.com/oauth2/authorize?client_id=848166639367094302&permissions=4294967287&scope=bot%20applications.commands">https://discord.com/oauth2/authorize?client_id=848166639367094302&permissions=4294967287&scope=bot%20applications.commands</a>`));

	app.listen(Pport, () => console.log(`Example app listening at http://localhost:${Pport}`));
	client.user.setActivity('SUS HELP', { type: 'PLAYING' });
});


client.on('guildDelete', guild => {
	client.settings.delete(guild.id);
});


client.on('messageDelete', (message) => {
	db.set(`snipe_${message.channel.id}`, {
		content: message.content,
		author: message.author,
	});
});


client.on('message', async message => {
	// Exit and stop if it's not there

	console.log(`\nCHATLOGS - [${message.guild}] ${message.author.tag}: ${message.content}`);




	if (db.has(message.author.id + '.afk')) {
		message.channel.send(`Welcome back ${message.author} I removed your AFK.`);
		db.delete(message.author.id + '.afk');
		db.delete(message.author.id + '.messageafk');
	}


	message.mentions.users.forEach((user) => {
		if (message.author.bot) return false;

		if (
			message.content.includes('@here') ||
     message.content.includes('@everyone')
		) {return false;}
		if (db.has(user.id + '.afk')) {
			message.channel.send(
				`${message.author}, the user you mentioned is currently AFK... Leave a message if urgent by DMing him`,
			);
		}
	});





	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();





	if(commandName === 'bj' || commandName === 'blackjack') {
		const blackjack = require('discord-bj');

		const game = blackjack(message, client);
		switch (game.result) {
		case 'Win':
			// do win stuff here
			break;
		case 'Tie':
			// do tie stuff here
			break;
		case 'Lose':
			// do lose stuff here
			break;
		case 'Double Win':
				 message.channel.send(`${message.author}, congratulations!`);
			break;
		case 'Double Lose':
				 message.channel.send(`${message.author}, you are such a disgrace!`);
			break;
		case 'ERROR':
			const err = message.channel.send(`${message.author}, there was an error!`);
					 err.react('🐞');
			break;

		}
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


	const me = client.user.tag;

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
		command.execute(message, args, prefix, me);
	}
		 catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
		message.channel.send('```' + error + '```');
	}

});


client.login();
