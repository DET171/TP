const Discord = require('discord.js');
const DIG = require('discord-image-generation');
module.exports = {
	name: 'delete',
	description: 'Ping!',
	args: false,
	async execute(message) {
		const avatar = message.author.displayAvatarURL({
			dynamic: false,
			format: 'png',
		});
		// Make the image
		const img = await new DIG.Delete().getImage(avatar);
		// Add the image as an attachement
		const attach = new Discord.MessageAttachment(img, 'delete.png');
		message.channel.send(attach);
	},
};
