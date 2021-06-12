module.exports = {
	name: 'ban',
	description: 'POGGGGGGGGGGGGG',
	execute(message, args) {
    if (message.member.hasPermission("BAN_MEMBERS")) {
    if (message.mentions.members.first()) {
        try {
            var victim = message.mentions.members.first();
            victim.kick();
            message.channel.send("Succesfully banned " + victim)
            member.guild.channels
              .find("name", client.settings.get(member.guild.id, "modLogChannel"))
              .send("Banned " + victim.tag)
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
