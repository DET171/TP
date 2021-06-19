module.exports = {
	name: 'quote',
	description: 'Ping!',
	args: false,
	execute(message) {
		const quotes = ['HAHAHAHA WIP'];
		message.channel.send(quotes[Math.floor(Math.random() * quotes.length)]);
	},
};
