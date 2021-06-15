
module.exports = {
	name: 'purge',
	description: 'Ping!',
	args: true,
  usage: '<interger>',
  aliases: ['prune'],
	async execute(message, args) {
    const amt = parseInt(args[0]) + 1;
    await message.channel.bulkDelete(amt);
    message.channel.send('<@!' + message.author.id + '> \n Deleted ' + amt + ' messages.')
    .then(message => message.delete({ timeout: 2000 }))
    .catch(console.error);

	},
};
