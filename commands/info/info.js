module.exports = {
	name: 'info',
	aliases: ['inf'],
	description: 'POGGGGGGGGGGGGG',
	args: false,
	async execute(message, args, prefix, me) {
		const { MessageEmbed } = require('discord.js');
		const embed = new MessageEmbed()
			.setTitle('Hello there!')
			.setDescription('I am ' + me + ', made by ππ­πΆπ²π»πͺπ΅ ππͺπ·πͺπ»π²πΌ#0340.')
			.setColor('RANDOM');
		message.channel.send(embed);
	},
};
