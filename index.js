require('events').EventEmitter.defaultMaxListeners = 15;
const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const Enmap = require('enmap');
const db = require('quick.db');
const express = require('express');

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

console.log('Loading command files...');
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs
		.readdirSync(`./commands/${folder}`)
		.filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		console.log(command.name);
	}
}

client.settings = new Enmap({
	name: 'conf',
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep',
});

const defaultConf = {
	ownerRole: 'Not Set',
	coownerRole: 'Not Set',
	adminRole: 'Administrator',
	modRole: 'Moderator',
	prefix: 'sus ',
};

client.on('ready', async () => {
	console.log('Logged in as ' + client.user.tag);
	const channel = await client.channels.fetch('855271120567926814');
	channel.send('Started up.');
	setInterval(function() {
		channel.send('I\'m up!').catch(console.error);
	}, 270000);
	const app = express();
	const Pport = 3000;

	app.get('/', (req, res) =>
		res.send(
			`Serving as ${client.user.tag} <br> You can invite me at <a href="https://discord.com/api/oauth2/authorize?client_id=853206803219480606&permissions=4294967287&scope=bot">https://discord.com/api/oauth2/authorize?client_id=853206803219480606&permissions=4294967287&scope=bot<a><br>You can invite my brother at <a href="https://discord.com/oauth2/authorize?client_id=848166639367094302&permissions=4294967287&scope=bot%20applications.commands">https://discord.com/oauth2/authorize?client_id=848166639367094302&permissions=4294967287&scope=bot%20applications.commands</a>`,
		),
	);

	app.listen(Pport, () =>
		console.log(`Example app listening at http://localhost:${Pport}`),
	);
	client.user.setActivity('sus help', { type: 'PLAYING' });
});

client.on('guildDelete', (guild) => {
	client.settings.delete(guild.id);
});

client.on('messageDelete', (message) => {
	db.set(`snipe_${message.channel.id}`, {
		content: message.content,
		author: message.author,
	});
});

client.on('message', async (message) => {
	// Exit and stop if it's not there

	console.log(
		`\nCHATLOGS - [${message.guild}] ${message.author.tag}: ${message.content}`,
	);

	if (!message.guild) return;
	const guildConf = client.settings.ensure(message.guild.id, defaultConf);
	const prefix = guildConf.prefix;

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
		) {
			return false;
		}
		if (db.has(user.id + '.afk')) {
			message.channel.send(
				`${message.author}, the user you mentioned is currently AFK... Leave a message if urgent by DMing him`,
			);
		}
	});

	if (message.content.startsWith('set')) {
		const configProps = Object.keys(guildConf).map((prop) => {
			return `${prop}  :  ${guildConf[prop]}\n`;
		});
		message.channel
			.send(`The following are the server's current configuration: \n
    ${configProps}`);
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (commandName === 'reportbug') {


		const bug = args.slice(0).join(' ');

		if (!bug) {
			message.channel.send('You are attempting to send a bug report without listing a bug!');
		}
		else {
			const bugchannel = await client.channels.fetch('856472254564663316');
			bugchannel.send(`<@${message.author.id}> of ${message.guild.name} (${message.guild.id}) reported the following bug: \n ${bug}`);
			message.channel.send('**Your bug was reported. If you abuse this feature you will be put on a blacklist and will be prevented from using this command.**');
		}

	}
	else if (commandName === 'reportuser') {
		const user = message.mentions.members.first() || args[0];
		const reason = args.slice(1).join(' ');
		if (!reason) {
			message.channel.send('You are attempting to report a user without a reason!');
		}
		else {
			const reportuser = await client.channels.fetch('856472285174956042');
			reportuser.send(`<@${message.author.id}> of ${message.guild.name} (${message.guild.id}) reported ${user} \n Reason: ${reason}`);
			message.channel.send('**Your bug was reported. If you abuse this feature you will be put on a blacklist and will be prevented from using this command.**');
		}

	}
	else if (commandName === 'botsuggest') {
		const suggestion = args.slice(0).join(' ');
		if (!suggestion) {
			message.channel.send('You are attempting to send an empty suggestion!');
		}
		else {
			const suggestchannel = await client.channels.fetch('856472269697187891');
			suggestchannel.send(`<@${message.author.id}> of ${message.guild.name} (${message.guild.id}) suggested the following: \n  ${suggestion}`);
			message.channel.send('**Your bug was reported. If you abuse this feature you will be put on a blacklist and will be prevented from using this command.**');
		}

	}


	else if (commandName === 'setconf') {
		if (!message.member.hasPermission('MANAGE_SERVER')) {
			return message.reply(
				'You do not have `Manage Server` permissions, sorry!',
			);
		}
		const [prop, ...value] = args;
		if (!client.settings.has(message.guild.id, prop)) {
			return message.reply('This key is not in the configuration.');
		}
		client.settings.set(message.guild.id, value.join(' '), prop);
		message.channel.send(
			`Guild configuration item ${prop} has been changed to:\n\`${value.join(
				' ',
			)}\``,
		);
	}

	// Now let's make another command that shows the configuration items.
	else if (commandName === 'showconf') {
		const configProps = Object.keys(guildConf).map((prop) => {
			return `${prop}  :  ${guildConf[prop]}\n`;
		});
		message.channel.send(`The following are the server's current configuration:
    \`\`\`${configProps}\`\`\``);
	}

	else if (commandName === 'bj' || commandName === 'blackjack') {
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
			break;
		}
	}

	const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	if (command.args && !args.length) {
		let reply =
      'You didn\'t provide any arguments, <@!' + message.author + '> !';
		if (command.usage) {
			reply +=
        '\nThe proper usage would be: `' +
        prefix +
        command.name +
        ' ' +
        command.usage +
        '`';
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
			const cdembed = new Discord.MessageEmbed()
				.setTimestamp()
				.setColor('DARK_BLUE');
			const timeLeft = (expirationTime - now) / 1000;
			cdembed
				.setTitle('Hey slow it down there')
				.setDescription(
					`The default cooldown for this command is \`${cooldownAmount} ms\` \n  Please wait ${timeLeft.toFixed(
						1,
					)} more second(s) before reusing the \`${command.name}\` command.`,
				);
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


const app = express();
const Sport = 8000;

app.get('/', (req, res) =>
	res.send(
		`Hey I'm here! <br> Port: ${Sport}`,
	),
);

app.listen(Sport, () =>
	console.log(`Example app listening at http://localhost:${Sport}`),
);
