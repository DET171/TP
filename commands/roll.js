const Discord = require('discord.js');
module.exports = {
	name: 'roll',
	description: 'Ping!',
	execute(message, args) {
    var x = Math.floor(Math.random() * 6) + 1;
    const embed = new Discord.MessageEmbed().setDescription(message.author.tag + " rolled a die and got " + x + "!").setColor('#fff');
    message.channel.send(embed);
	},
};
