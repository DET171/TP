const Discord = require('discord.js');
const DIG = require('discord-image-generation');
module.exports = {
	name: 'lisa',
	description: 'Ping!',
	async execute(message, args) {
    let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
      // Make the image
		let text = args.slice(0).join(" ");
    let img = await new DIG.LisaPresentation().getImage(text);
      // Add the image as an attachement
    let attach = new Discord.MessageAttachment(img, "delete.png");
    message.channel.send(attach);
	},
};
