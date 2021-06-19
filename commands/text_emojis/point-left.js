module.exports = {
	name: 'pl',
	description: 'Ping!',
	args: false,
	execute(message) {
		message.delete();
		message.channel
			.send(message.author.username + ' sent \n☜(ﾟヮﾟ☜)')
			.then(console.log(`${message.author.username} sent point-left`));
	},
};
