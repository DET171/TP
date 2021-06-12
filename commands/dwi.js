module.exports = {
	name: 'dwi',
	description: 'Ping!',
	execute(message, args) {
		message.delete();
		message.channel.send(message.author.username + ' sent \n( •_•)>⌐■-■\n(⌐■_■)')
  		.then(msg => console.log(`${message.author.username} sent Deal With it`));
	},
};