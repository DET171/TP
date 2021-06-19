const minigames = require('discord-minigames');
module.exports = {
	name: 'battle',
	description: 'POGGGGGGGGGGGGG',
	aliases: ['bt'],
	args: true,
	usage: '<member>',
	execute(message) {
		const member = message.mentions.members.first();
		minigames.startBattle(member, message);
	},
};
