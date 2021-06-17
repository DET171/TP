module.exports = {
	name: 'dog',
	description: 'POGGGGGGGGGGGGG',
	async execute(message, args) {
    const load = await message.channel.send('*Getting image...*');
    const request = require('request');

    request.get('http://thedogapi.com/api/images/get?format=src&type=png', {

    }, async function(error, response, body) {
	     if(!error && response.statusCode == 200) {

		       load.edit(response.request.uri.href);
	     }
      else {
		      console.log(error);
	    }
})
	},
};
