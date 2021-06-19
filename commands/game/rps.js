const Discord = require('discord.js');
module.exports = {
	name: 'rps',
	description: 'Ping!',
	aliases: [''],
	args: false,
	async execute(message) {
		const rps = [':moyai:', ':scroll:', ':scissors:'];
		const embed = new Discord.MessageEmbed()
			.setDescription(
				'Let\'s play a game of Rock, Paper, Scissors! Please react what you would like to choose with the emojis below!',
			)
			.setColor('RANDOM');
		const m = await message.channel.send(embed);
		await m.react('🗿');
		await m.react('📜');
		await m.react('✂️');

		const filter = (reaction, user) => {
			return (
				['🗿', '📜', '✂️'].includes(reaction.emoji.name) &&
        user.id === message.author.id
			);
		};

		m.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then((collected) => {
				const reaction = collected.first();
				const botChoice = rps[Math.floor(Math.random() * rps.length)];
				m.reactions
					.removeAll()
					.catch((error) =>
						console.error('Failed to clear reactions: ', error),
					);

				message.channel.send(
					`You chose ${reaction.emoji.name} and I chose ${botChoice}`,
				);
			})
			.catch((collected) => {
				message.reply('hmm...');
				console.error(collected);
			});
	},
};
