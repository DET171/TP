module.exports = {
	name: 'snipe',
  aliases: ['messagesnipe'],
	description: 'POGGGGGGGGGGGGG',
	args: false,
	async execute(message, args, prefix) {
    const {MessageEmbed} = require('discord.js');
    const db = require('quick.db')

    const snipe = db.get(`snipe_${message.channel.id}`)

    if (!snipe) return message.channel.send("Nothing to snipe")

    const embed = new MessageEmbed()
	   .setTitle('Snipe')
	    .setDescription(snipe.content)
	     .setAuthor(snipe.author.tag)
	      .setColor("GREEN");
    message.channel.send(embed)
	},
};
