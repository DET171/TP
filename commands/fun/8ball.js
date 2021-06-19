module.exports = {
	name: '8ball',
	description: 'Ping!',
	args: true,
	usage: '<question you want to ask the bot>',
	execute(message) {
		var eightball = [
			'yes!',
			'no...',
			'maybe?',
			'probably',
			'I don\'t think so.',
			'never!',
			'you can try...',
			'up to you!',
			'that\'s just BS',
		];
		message.reply(eightball[Math.floor(Math.random() * eightball.length)]);
	},
};
