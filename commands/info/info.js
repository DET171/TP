module.exports = {
	name: 'info',
	aliases: ['inf'],
	description: 'POGGGGGGGGGGGGG',
	args: false,
	async execute(message, args, prefix, me) {
		const { MessageEmbed } = require('discord.js');
		const embed = new MessageEmbed()
			.setTitle('Hello there!')
			.setDescription('I am ' + me + ', made by 𝓐𝓭𝓶𝓲𝓻𝓪𝓵 𝓒𝓪𝓷𝓪𝓻𝓲𝓼#0340.')
			.setColor('RANDOM');
		message.channel.send(embed);
	},
};
