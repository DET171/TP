module.exports = {
	name: 'fp',
	description: 'Ping!',
	args: false,
	execute(message, args) {
		message.delete();
		message.channel.send(message.author.username + ' sent \n( ・◡・)つ━☆🌸🌺🌼');
	},
};
