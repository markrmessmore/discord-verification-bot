const discordBot = require('./index.js')

exports.run = function(Discord, member){
    let memberMsg = new Discord.MessageEmbed()
    .setColor(3447003)
    .setTitle(`Welcome to the ${config.guildName} Discord Server!`)
    .setDescription(`\nWelcome ***${member.user.username}*** to the ${config.guildName} Discord Server!\n${settings.welcomeMsg}`);

    discordBot.msg(memberMsg)
}