module.exports = {
	name: 'ban',
	description: 'POGGGGGGGGGGGGG',
	execute(message, args) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
    if (message.mentions.members.first()) {
        try {
						let reason = args.slice(1).join(" ");
            var victim = message.mentions.members.first();
            victim.kick(reason);
            message.channel.send("Succesfully banned " + victim + "\n Reason: " + reason)
            member.guild.channels.cache
              .find("name", client.settings.get(member.guild.id, "modLogChannel"))
              .send("Banned " + victim.tag + "\n Reason: " + reason)
              .catch(console.error);
        } catch {
            message.channel.send(". ");
        }
    } else {
        message.reply("You do not have permissions to ban " + victim.tag);
    }
}
	},
};
