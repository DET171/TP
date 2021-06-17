const Discord = require('discord.js');
module.exports = {
	name: 'whois',
	description: 'POGGGGGGGGGGGGG',
	args: true,
	usage: '<member> <reason>',
	execute(message, args) {
    const embed = new Discord.MessageEmbed();
             var user = message.mentions.members.first();
            if(!args[0]) return message.reply('Apologies! Please specify a particular member!');
                embed.setTitle('User Information');
                embed.addField('Username', user.user.username);
                embed.addField('User ID', user.id);
                embed.addField('User Tag', user.user.tag);
                embed.addField('Roles:', user.roles.cache.map(r => `${r}`).join(' | '));
                embed.addField('Created at:', user.user.createdAt);
                embed.setColor(0x00FF93);
                embed.setThumbnail(user.user.avatarURL());
            message.channel.send(embed);
	},
};
