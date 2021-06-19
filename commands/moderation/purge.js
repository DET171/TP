module.exports = {
	name: 'purge',
	description: 'Ping!',
	aliases: ['pu', 'messagepurge', 'msgpurge', 'prune'],
	args: true,
	usage: '<interger>',
	async execute(message, args) {
		const amt = parseInt(args[0]) + 1;
		await message.channel.bulkDelete(amt);
		message.channel.send('<@!' + message.author.id + '> \n Deleted ' + args[0] + ' messages.')
			.then(messages => messages.delete({ timeout: 2000 }))
			.catch(console.error);

	},
};
