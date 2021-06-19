module.exports = {
	name: 'cat',
	description: 'POGGGGGGGGGGGGG',
	async execute(message) {
		const load = await message.channel.send('*Getting image...*');
		const request = require('request');

		request.get('http://thecatapi.com/api/images/get?format=src&type=png', {

		}, async function(error, response) {
			if(!error && response.statusCode == 200) {

				load.edit(response.request.uri.href);
			}
			else {
				console.log(error);
			}
		});
	},
};
