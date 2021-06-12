const Discord = require("discord.js");
const client = new Discord.Client();
const https = require('https'); 

const got = require('got');
module.exports = {
	name: 'pf',
	description: 'pf!',
	execute(message, args) {
	var x = args[0];
		if (x === 'reddit') {
			const embed = new Discord.MessageEmbed();
			got('https://www.reddit.com/r/phantomforces/random/.json')
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
		}
		else if (x === 'links') {
			var newEmbed = new Discord.MessageEmbed()
			.setTitle('Phantom Forces Links')
			.setColor('RANDOM')
			.addFields(
				{ name: 'StyLiS Studios Discord Server', value: '[https://discord.com/invite/stylis](https://discord.com/invite/stylis)' },
				{ name: 'Phantom Forces Wiki', value: '[https://roblox-phantom-forces.fandom.com/wiki/Phantom_Forces_Wiki](https://roblox-phantom-forces.fandom.com/wiki/Phantom_Forces_Wiki)' },
				{ name: 'Game', value: '[https://www.roblox.com/games/292439477/PF](https://www.roblox.com/games/292439477/PF)'},
				{ name: 'StyLiS CEOs', value: '[https://discord.gg/BF7zTa8Kbb](https://discord.gg/BF7zTa8Kbb)'},
			);
			message.channel.send(newEmbed);
		}
		else if (x === 'youtubers') {
			var newEmbedtwo = new Discord.MessageEmbed()
			.setTitle('Phantom Forces Youtubers')
			.setColor('RANDOM')
			.addFields(
				{ name: 'Godstatus', value: '[https://www.youtube.com/channel/UC1UDrl-ZWP2R8SAv6zvdxjQ](https://www.youtube.com/channel/UC1UDrl-ZWP2R8SAv6zvdxjQ)' },
				{ name: 'PetriFyTV', value: '[https://www.youtube.com/channel/UCiCRkbKT5rccLcur2nv3jkA](https://www.youtube.com/channel/UCiCRkbKT5rccLcur2nv3jkA)' },
				{ name: 'Remanings', value: '[https://www.youtube.com/channel/UCSSfq3nNRhpV7uh0NfBYxvg](https://www.youtube.com/channel/UCSSfq3nNRhpV7uh0NfBYxvg)'},
				{ name: 'Oscar', value: '[https://www.youtube.com/channel/UCyWzvWoYRqdkNB9HScS7MTA](https://www.youtube.com/channel/UCyWzvWoYRqdkNB9HScS7MTA)'},
				{ name: 'AgentJohn2', value: '[https://www.youtube.com/channel/UCt2eTnEQQ6GL_7R4-C9UI7g](https://www.youtube.com/channel/UCt2eTnEQQ6GL_7R4-C9UI7g)'},
				{ name: 'FPS_Archived', value: '[https://www.youtube.com/channel/UCeinZO0Q8a1pCCty2C9HqoA](https://www.youtube.com/channel/UCeinZO0Q8a1pCCty2C9HqoA)'},
				{ name: 'SynthesizeOG', value: '[https://www.youtube.com/channel/UCJdn7rGoYIG5p46HqxLimQg](https://www.youtube.com/channel/UCJdn7rGoYIG5p46HqxLimQg)'},
				{ name: 'Paradox', value: '[PoKe](https://www.youtube.com/channel/UC64v1CqfTBlwumeNqxSClDA) \n [Tommy](https://www.youtube.com/channel/UCU7yUT-eChe8oAW-tztvmXw)'},
			);
			message.channel.send(newEmbedtwo);
		}
	},
};