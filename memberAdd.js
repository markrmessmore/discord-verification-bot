const discordBot = require('./index.js')

exports.run = function(Discord, settings, member){
    let memberMsg = new Discord.MessageEmbed()
    .setColor(3447003)
    .setTitle(`Welcome to the ${settings.guildName} Discord Server!`)
    .setDescription(`\nWelcome ***${member.user.username}*** to the ${settings.guildName} Discord Server!\n\n${settings.welcomeMsg}`);

    discordBot.msg(memberMsg, 30000)
}