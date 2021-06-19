module.exports = {
	name: 'ban',
	description: 'POGGGGGGGGGGGGG',
	args: true,
	usage: '<member> <reason>',
	execute(message, args) {
		if (message.member.hasPermission('BAN_MEMBERS')) {
			if (message.mentions.members.first()) {
				try {
					const reason = args.slice(1).join(' ');
					var victim = message.mentions.members.first();
					victim.kick(reason);
					message.channel.send(
						'Succesfully banned ' + victim + '\n Reason: ' + reason,
					);

				}
				catch {
					message.channel.send('. ');
				}
			}
			else {
				message.reply('You do not have permissions to ban ' + victim.tag);
			}
		}
	},
};
