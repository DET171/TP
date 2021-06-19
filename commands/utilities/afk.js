const db = require('quick.db');
module.exports = {
	name: 'afk',
	description: 'POGGGGGGGGGGGGG',
	args: true,
	usage: '<set/off>',
	async execute(message, args) {
		if(args[0] === 'set') {
			message.channel.send('Alright, I have set your AFK. I will send a message to the users who mention you...');
			db.set(message.author.id + '.afk', 'true');
			db.set(
				message.author.id + '.messageafk',
				args.slice(1).join(' '),
			);
		}
		if (args[0] === 'off') {
			db.delete(message.author.id + '.afk');
			db.delete(message.author.id + '.messageafk');
		}
	},
};
