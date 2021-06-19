const Discord = require('discord.js');
module.exports = {
	name: 'roll',
	description: 'Ping!',
	args: false,
	execute(message) {
		var x = Math.floor(Math.random() * 6) + 1;
		const embed = new Discord.MessageEmbed()
			.setDescription(message.author.tag + ' rolled a die and got ' + x + '!')
			.setColor('#fff');
		message.channel.send(embed);
	},
};
