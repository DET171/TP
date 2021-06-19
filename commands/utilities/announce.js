// Stupid-ass decisions by eslint are ignored.
module.exports = {
	name: 'announce',
	aliases: ['ann', 'announcement'],
	description: 'POGGGGGGGGGGGGG',
	args: true,
	usage: '<here/everyone/none/role_ID> <channel_ID> <announcement>',
	async execute(message, args) {
		if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You must have `Manage Channel` permissions to use this command!');
		const ann = args.slice(2).join(' ');
		if(args[0] === 'here') {
			var ping = '@here';
		}
		else if(args[0] === 'everyone') {
			var ping = '@everyone';
		}
		else if(args[0] === 'none') {
			var ping = '';
		}
		else {
			var ping = '<@&' + args[0] + '>';
		}
		const channelid = args[1];
		const head = ping + '   \n🔊🔊🔊  **ANNOUNCEMENT**  🔊🔊🔊 \n ';
		const announcement = head + ann;
		const channell = message.member.guild.channels.cache.get(channelid);
		channell.send(announcement);
		message.delete;
	},
};
