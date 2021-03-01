const   discordBot  = require('./index.js'),
        settings    = require('./settings.json');


exports.checkPermission = function(msg){
    let memberRoles = []
    
    message.member.roles.cache.forEach(role => {
        memberRoles.push(role.name)
    })

    return memberRoles.some(r => settings.discordRoles.includes(r))
}

exports.verify = function(msg){
    if (exports.checkPermission == true){
        let user = msg.mentions.members.first()
    }
    
}