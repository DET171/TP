module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
    const Discord = require('discord.js')
    const client = new Discord.Client();
		message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. \n API Latency is ${Math.round(message.client.ws.ping)}ms`);
	},
};
