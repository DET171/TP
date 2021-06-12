module.exports = {
	name: 'algebraic',
	description: 'Ping!',
	execute(message, args) {
		message.delete();
		message.channel.send(message.author.username + ' sent \n| ( •◡•)| (❍ᴥ❍ʋ)');
	},
};