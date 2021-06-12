module.exports = {
	name: 'kick',
	description: 'Ping!',
	execute(message, args) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
    if (message.mentions.members.first()) {
        try {
            var victim = message.mentions.members.first();
            victim.kick();
            message.channel.send("Succesfully kicked " + victim)
            member.guild.channels
              .find("name", client.settings.get(member.guild.id, "modLogChannel"))
              .send("Kicked " + victim.tag)
              .catch(console.error);
        } 
    } else {
        message.reply("You do not have permissions to kick " + victim.tag);
    }
}
	},
};
