const Discord = require('discord.js');
const got = require('got');

module.exports = {
	name: 'reddit',
	description: 'Ping!',
	cooldown: 5,
	args: false,
	aliases: ['rd'],
	execute(message, args) {
		const link = 'https://www.reddit.com/r/' + args[0] + '/random/.json';
		const embed = new Discord.MessageEmbed();
		got(link)
			.then(response => {
				const [list] = JSON.parse(response.body);
				const [post] = list.data.children;

				const permalink = post.data.permalink;
				const memeUrl = `https://reddit.com${permalink}`;
				const memeImage = post.data.url;
				const memeTitle = post.data.title;
				const memeUpvotes = post.data.ups;
				const memeNumComments = post.data.num_comments;

				embed.setTitle(`${memeTitle}`);
				embed.setURL(`${memeUrl}`);
				embed.setColor('RANDOM');
				embed.setImage(memeImage);
				embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);

				message.channel.send(embed);
			})
			.catch(console.error);
	},
};
