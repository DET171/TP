module.exports = {
	name: 'pl',
	description: 'Ping!',
	args: false,
	execute(message, args) {
		message.delete();
		message.channel.send(message.author.username + ' sent \n☜(ﾟヮﾟ☜)')
  		.then(msg => console.log(`${message.author.username} sent point-left`));
	},
};