const Discord = require('discord.js');
module.exports = {
	name: 'embedann',
	aliases: ['eann', 'embedannouncement'],
	description: 'POGGGGGGGGGGGGG',
	args: true,
	usage: '<role_ID> <channel_ID> <Embed Title>;<Embed description>;<Embed Thumbnail>',
	async execute(message, args, prefix) {
		if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('You must have `Manage Channel` permissions to use this command!');
		const str = args.slice(2).join(' ');
		const sargs = str.slice().trim().split(';');
		if(sargs.length !== 3) return message.reply('please run `' + prefix + ' help eann` to see the correct command usage.');
		if(args[0] === '') {var ping = '';}
		else{	var ping = '<@&' + args[0] + '>';	}
		const channelid = args[1];
		const embed = new Discord.MessageEmbed;

		embed.setTitle(sargs[0]).setDescription(sargs[1]).setFooter(sargs[2]);
		const channell = message.member.guild.channels.cache.get(channelid);
		channell.send(ping, embed);
		message.delete;
	},
};
