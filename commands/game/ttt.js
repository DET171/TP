module.exports = {
	name: 'ttt',
	description: 'Ping!',
	aliases: ['tictactoe'],
	args: false,
	async execute(message) {
		const TicTacToe = require('discord-tictactoe');
		const game = new TicTacToe({ language: 'en' });
		game.handleMessage(message);
	},
};
