
module.exports = {
	name: '8ball',
	description: 'Ping!',
	args: true,
  usage: '<question you want to ask the bot>',
	execute(message, args) {
    var eightball = [ // sets the answers to an eightball
    "yes!",
    "no...",
    "maybe?",
    "probably",
    "I don't think so.",
    "never!",
    "you can try...",
    "up to you!",
    "that's just BS"
    ]
    message.reply(eightball[Math.floor(Math.random() * eightball.length)]);
	},
};
