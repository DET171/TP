module.exports = {
	name: 'kick',
	description: 'Ping!',
	args: true,
	usage: '<member> <reason>',
	execute(message, args) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
    if (message.mentions.members.first()) {
        try {
						let reason = args.slice(1).join(" ");
            var victim = message.mentions.members.first();
            victim.kick(reason);
            message.channel.send("Succesfully kicked " + victim + "\n Reason: " + reason)
            member.guild.channels.cache
              .find("name", client.settings.get(member.guild.id, "modLogChannel"))
              .send("Kicked " + victim.tag + "\n Reason: " + reason)
              .catch(console.error);
        } catch {
            message.reply(". ");
        }
    } else {
        message.reply("You do not have permissions to kick " + victim.tag);
    }
}
	},
};
