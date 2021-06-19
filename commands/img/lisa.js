const Discord = require('discord.js');
const DIG = require('discord-image-generation');
module.exports = {
	name: 'lisa',
	description: 'Ping!',
	args: true,
	usage: '<string>',
	async execute(message, args) {
		// Make the image
		const text = args.slice(0).join(' ');
		const img = await new DIG.LisaPresentation().getImage(text);
		// Add the image as an attachement
		const attach = new Discord.MessageAttachment(img, 'delete.png');
		message.channel.send(attach);
	},
};
