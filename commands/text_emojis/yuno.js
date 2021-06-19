module.exports = {
	name: 'yuno',
	description: 'Ping!',
	args: false,
	execute(message) {
		message.delete();
		message.channel.send(message.author.username + ' sent \nლ(ಠ益ಠლ)');
	},
};
