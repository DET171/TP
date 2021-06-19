module.exports = {
	name: 'choose',
	description: 'Ping!',
	aliases: ['ch'],
	args: true,
	usage: '<choice1>;<choice2>;etc...',
	async execute(message, args) {
		const ann = args.slice(0).join(' ');
		const choices = ann.slice().trim().split(';');
		message.channel.send(`${message.author}, I choose ${choices[Math.floor(Math.random() * choices.length)]}!`);
	},
};
