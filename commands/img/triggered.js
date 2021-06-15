const Discord = require('discord.js');
const DIG = require('discord-image-generation');
module.exports = {
	name: 'triggered',
	description: 'Ping!',
	args: false,
	async execute(message, args) {
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
      // Make the image
    let img = await new DIG.Triggered().getImage(avatar);
      // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "AHHHHHHHHHH.png");
    message.channel.send(attach);
	},
};
