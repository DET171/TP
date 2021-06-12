
const fs = require('fs');
const Discord = require("discord.js");
const config = require('./config.json');
const client = new Discord.Client();
const https = require('https');
const Enmap = require('enmap');
const got = require('got');
client.commands = new Discord.Collection();
console.log("Loading command files...")
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));









for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(command.name);
}








// I attach settings to client to allow for modular bot setups
// In this example we'll leverage fetchAll:false and autoFetch:true for
// best efficiency in memory usage. We also have to use cloneLevel:'deep'
// to avoid our values to be "reference" to the default settings.
// The explanation for why is complex - just go with it.
client.settings = new Enmap({
  name: "config",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});

const defaultConfig = {
	ownerRole: "Not Set",
	coownerRole: "Not Set",
	adminRole: "Administrator",
	modRole: "Moderator",
  adminRole: "Administrator",
	prefix: "sus ",
  modLogChannel: "mod-log",
  welcomeChannel: "welcome",
  welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D"
}

client.on("ready", () => {
  console.log("Logged in as " + client.user.tag);
});


client.on("guildDelete", guild => {
  // Removing an element uses `delete(key)`
  client.settings.delete(guild.id);
});

client.on("guildMemberAdd", member => {
  // This executes when a member joins, so let's welcome them!

  // First, ensure the settings exist
  client.settings.ensure(member.guild.id, defaultConfig);

  // First, get the welcome message using get:
  let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");

  // Our welcome message has a bit of a placeholder, let's fix that:
  welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)

  // we'll send to the welcome channel.
  member.guild.channels
    .find("name", client.settings.get(member.guild.id, "welcomeChannel"))
    .send(welcomeMessage)
    .catch(console.error);
});











client.on("message", async (message) => {
  // Exit and stop if it's not there

	console.log(`\nCHATLOGS - [${message.guild}] ${message.author.tag}: ${message.content}`);



	const guildConf = client.settings.ensure(message.guild.id, defaultConfig);



	let prefix = guildConf.prefix;





  if (!message.guild || !message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
	


if(command === "setconf") {
	message.channel.send("Tip: When setting roles, enter the ***role name spelled exact. *** \n ***DO NOT PING THE ROLE OR ENTER THE ROLE ID*** \n PS Caps matter. If you get anything wrong, you will have to create an extra role. :D");
	const adminRole = message.guild.roles.cache.find(r => r.name === guildConf.adminRole);
	if(!adminRole) return message.reply("Administrator Role Not Found");
	if(!message.member.roles.cache.has(adminRole.id)) {
		return message.reply("You're not an admin, sorry!");
	}
	const [prop, ...value] = args;
	if(!client.settings.has(message.guild.id, prop)) {
		return message.reply("This key is not in the configuration.");
	}
	client.settings.set(message.guild.id, value.join(" "), prop);
	message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);

}





  // Now let's make another command that shows the configuration items.
  if(command === "showconf") {
    let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}  :  ${guildConf[prop]}\n`;
    });
    message.channel.send(`The following are the server's current configuration:
    \`\`\`${configProps}\`\`\``);
  }








	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args);

    }
		 catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});




client.login(config.token);
