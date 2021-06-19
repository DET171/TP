module.exports = {
	name: 'dwi',
	description: 'Ping!',
	args: false,
	execute(message) {
		message.delete();
		message.channel.send(message.author.username + ' sent \n( •_•)>⌐■-■\n(⌐■_■)')
			.then(console.log(`${message.author.username} sent Deal With it`));
	},
};
