const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./token.json")

 
let prefix = '$'
let footer  = "Crée par Evil Morty"
client.login(procss.env.TOKEN)
  /////////////////////////////////////////////////////////////////////////////
client.on("ready", () => {
    console.log("Je suis connecté !")
 
    const statuts = ["Protéger ton Serveur !"]
 
    setInterval(function(){
 
    const stat = statuts[Math.floor(Math.random() * statuts.length)]
    client.user.setActivity(stat, {type: "PLAYING"})
    },5000);
client.user.setStatus("online")
});
  /////////////////////////////////////////////////////////////////////////////
// new function 
function message(user, message) {
    //code here
}
client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // If the message content starts with "!kick"
    if (message.content.startsWith('$kick')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              // We let the message author know we were able to kick the person
              message.reply(`${user.tag} a bien été expulsé !`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to kick the member,
              // either due to missing permissions or role hierarchy
              message.reply(':x: Je ne peux pas expulser cette personne !');
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply(":x: cette utilisateur ne se trouve pas ici !");
        }
        // Otherwise, if no user was mentioned
      } else {
        message.reply(":x: vous n'avez pas mentionner la personne que vous voulez expulser !");
      }
    }
  });
    /////////////////////////////////////////////////////////////////////////////
  client.on("message", message => {
    if(message.content === prefix + "help") {
        message.channel.send(
            let = new Discord.MessageEmbed()
            .setTitle("Help Menu")
            .setDescription("prefix : $")
            .addField("Divertissement :", "troll,")
            .addField("utilitaire :", "antispam,kick,clear,ban")
     .setThumbnail("https://media.giphy.com/media/xVImin7ZL8ySpVTUll/giphy.gif")
            .setColor("0xf50606")
            .setFooter(footer)
        )
    }
})
  /////////////////////////////////////////////////////////////////////////////
  
client.on('message', message => {
    if (message.content === '$troll') {
      message.reply('https://tenor.com/view/wtf-haha-flirty-fuck-smile-gif-15931510');
    }
  });

    /////////////////////////////////////////////////////////////////////////////
    
  client.on('message', message => {
    if (message.content === '$antispam') {
      message.reply(':white_check_mark: la commande a bien été effectué');
    }
  })
  /////////////////////////////////////////////////////////////////////////////
  
  client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content
      .toLowerCase()
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
    const [command, input] = args;
  
    if (command === 'clear' || command === 'c') {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel
          .send(
            "You cant use this command since you're missing `manage_messages` perm",
          );
      }
  
      if (isNaN(input)) {
        return message.channel
          .send('enter the amount of messages that you would like to clear')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
  
      if (Number(input) < 0) {
        return message.channel
          .send('enter a positive number')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
  
      // add an extra to delete the current message too
      const amount = Number(input) > 100
        ? 101
        : Number(input) + 1;
  
      message.channel.bulkDelete(amount, true)
      .then((_message) => {
        message.channel
          // do you want to include the current message here?
          // if not it should be ${_message.size - 1}
          .send(`Bot cleared \`${_message.size}\` messages :broom:`)
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      });
    
  
  
    if (command === 'help' && input === 'clear') {
      const newEmbed = new MessageEmbed()
        .setColor('#00B2B2')
        .setTitle('**Clear Help**')
        .setDescription(
          `This command clears messages for example \`${prefix}clear 5\` or \`${prefix}c 5\`.`,
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL(),
        )
        .setTimestamp();
  
      message.channel.send(newEmbed);
    }
  };
  /////////////////////////////////////////////////////////////////////////////
  client.on('message', message => {
    if (message.content === '$ping') {  
  message.channel.send('pinging').then(m => {
      m.edit(`🏓Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    });
  }
  });
  //////////////////////////////////////////////////////////////////
  
  client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;

    // if the message content starts with "!ban"
    if (message.content.startsWith('$ban')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.members.resolve(user);
        // If the member is in the guild
        if (member) {
          /**
           * Ban the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           * Read more about what ban options there are over at
           * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
           */
          member
            .ban({
              reason: "Il n'a pas respecté les regles",
            })
            .then(() => {
              // We let the message author know we were able to ban the person
              message.channel.send('**:white_check_mark: ${user.tag} a bien été banni de ce serveur !**');
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to ban the member,
              // either due to missing permissions or role hierarchy
              message.channel.send(":x: Je n'ai pas réussi a bannir ce membre");
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.channel.send(":x:cette personne n'est pas dans ce serveur !*");
        }
      } else {
        // Otherwise, if no user was mentioned
        message.channel.send("**:x: Vous n'avez pas mentionné la personne à bannir!**");
      }
    }
  }); 

  // Log our bot in using the token from https://discord.com/developers/applications
  client.login(process.env.TOKEN);
  ////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
	warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
	muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
	kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
	banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
	maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
	warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
	kickMessage: '**{user_tag}** a été kick pour spam.', // Message that will be sent in chat upon kicking a user.
	muteMessage: '**{user_tag}** a été mute pour spam.',// Message that will be sent in chat upon muting a user.
	banMessage: '**{user_tag}** a été banni pour spam.', // Message that will be sent in chat upon banning a user.
	maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
	maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
	ignoredPermissions: [ 'ADMINISTRATOR'], // Bypass users with any of these permissions.
	ignoreBots: true, // Ignore bot messages.
	verbose: true, // Extended Logs from module.
	ignoredMembers: [], // Array of User IDs that get ignored.
	muteRoleName: "Muted", // Name of the role that will be given to muted users!
	removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
	// And many more options... See the documentation.
});

client.on('ready', () => console.log(`Logged in as ${client.user.tag}.`));

client.on('message', (message) => antiSpam.message(message)); 

client.login(process.env.TOKEN);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  })
