module.exports = {
	name: 'als',
	description: 'als!',
	args: false,
	execute(message, args) {
		const age = args[0];
		const sex = args[1];
		const location = args[2];
		message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
	},
};
