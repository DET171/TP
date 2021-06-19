module.exports = {
	name: 'google',
	cooldown: 3,
	aliases: ['g', 'goog'],
	usage: ' <string>',
	description: 'Ping!',
	args: true,
	execute(message, args) {
		const query = args.slice(0).join(' ');
		const link = 'https://www.google.com/search?q=' + query;
		message.channel.send(link);
	},
};
