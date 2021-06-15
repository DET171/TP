const Discord = require('discord.js');
const DIG = require('discord-image-generation');
module.exports = {
	name: 'gay',
	description: 'Ping!',
	args: false,
	async execute(message, args) {
		let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
		// Make the image
		let img = await new DIG.Gay().getImage(avatar);
		// Add the image as an attachement
		let attach = new Discord.MessageAttachment(img, "gay.png");
		message.channel.send(attach)
	},
};
