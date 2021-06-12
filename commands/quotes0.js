
module.exports = {
	name: 'quote',
	description: 'Ping!',
	execute(message, args) {
    const quotes = [
      '',
      '',
      '',
    ];
    message.channel.send(quotes[Math.floor(Math.random() * quotes.length)]);
	},
};
