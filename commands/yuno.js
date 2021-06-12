module.exports = {
	name: 'yuno',
	description: 'Ping!',
	execute(message, args) {
		message.delete();
		message.channel.send(message.author.username + ' sent \nლ(ಠ益ಠლ)');
	},
};