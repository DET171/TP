module.exports = {
	name: 'cf',
	description: 'Ping!',
	aliases: ['coinflip', 'flip'],
	args: false,
	async execute(message) {
		function doRandHT() {
			var rand = ['HEADS!', 'TAILS!'];

			return rand[Math.floor(Math.random() * rand.length)];
		}

		const embed = {
			title: 'Here is the winner! :coin:',
			description: doRandHT(),
			color: 'RANDOM',
		};
		message.channel.send({ embed });
	},
};
