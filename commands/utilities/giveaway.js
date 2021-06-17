const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
	name: 'g',
	description: 'Ping!',
	args: true,
  cooldown: 5,
  usage: '<start/find/end/delete> <time> <winners> <prize>',
  aliases: ['giveaway', 'giveaways', 'gaw'],
	async execute(message, args, prefix, client) {
	if(!message.member.hasPermission('MANAGE_CHANNELS'))return message.channel.send('Uh oh! You can\'t use this command!')


  const f = args[0];
  if(f === 'start'){
    client.giveawaysManager.start(message.channel, {
  	    time: ms(args[1]),
  	    winnerCount: parseInt(args[2]),
  	    prize: args.slice(3).join(' '),
  	    messages: {
  	        giveaway: '\n🎉🎉 **GIVEAWAY TIME** 🎉🎉',
  	        giveawayEnded: '\n🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
  	        timeRemaining: 'Time remaining: **{duration}**',
  	        inviteToParticipate: 'React with 🎉 to participate!',
  	        winMessage: 'Congratulations, {winners}! You won **{prize}**!\n{messageURL}',
  	        embedFooter: 'Powered by the discord-giveaways package',
  	        noWinner: 'Giveaway cancelled, no valid participations.',
  	        hostedBy: 'Hosted by: {user}',
  	        winners: 'winner(s)',
  	        endedAt: 'Ended at',
  	        units: {
  	            seconds: 'seconds',
  	            minutes: 'minutes',
  	            hours: 'hours',
  	            days: 'days',
  	        }
  	    }
  	});

    }
    if(f === 'reroll'){
      const messageID = args[1];
      client.giveawaysManager.reroll(messageID, {
              messages: {
                  congrat: '🎉 New winner(s): {winners}! Congratulations, you won **{prize}**!\n{messageURL}',
                  error: 'No valid participations, no new winner(s) can be chosen!'
              }
          }).catch((err) => {
              message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
          });
    }
    if(f === 'edit'){
      const messageID = args[1];
        client.giveawaysManager.edit(messageID, {
            addTime: 5000,
            newWinnerCount: 3,
            newPrize: 'New Prize!'
        }).then(() => {
            // Here, we can calculate the time after which we are sure that the lib will update the giveaway
            const numberOfSecondsMax = client.giveawaysManager.options.updateCountdownEvery / 1000;
            message.channel.send('Success! Giveaway will updated in less than ' + numberOfSecondsMax + ' seconds.');
        }).catch((err) => {
            message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
        });
    }
    if(f === 'end'){
      const messageID = args[1];
        client.giveawaysManager.end(messageID).then(() => {
            message.channel.send('Success! Giveaway ended!');
        }).catch((err) => {
            message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
        });
    }
    if(f === 'delete' || f === 'del'){
      const messageID = args[0];
        client.giveawaysManager.delete(messageID).then(() => {
            message.channel.send('Success! Giveaway deleted!');
        }).catch((err) => {
            message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
        });
    }
    if(f === 'find'){
      var giveaway = client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.guildID === message.guild.id && g.messageID === args[1]);
      if (!giveaway) return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
    }
	},
};
