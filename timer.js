const   Discord     = require('discord.js');

//FILES
const   discordBot  = require('./index.js'),
        settings    = require('./settings.json');

// WARN THE USER AFTER THE SPECIFIED AMOUNT OF TIME
exports.warn = function(userList, msgList){
    let sendWarning = function(usr){
        let memberMsg = `Attention <@!${usr.user.id}> please verify in this channel or you will be automatically removed.`
        discordBot.msg(memberMsg, 30000)
    }
    userList.forEach(usr => {
        let now = new Date().getTime()
        //FIRST CHECK IF THE USER HAS BEEN CONNECTED TO THE SERVER LONGER THAN THE ESTABLISHED 'WARN TIME'
        if ((now - usr.joinedTimestamp > settings.warningTime) && (now - usr.joinedTimestamp < settings.kickTime)){
            //FILTER OUT SO WE ONLY HAVE THIS USER'S MESSAGES
            let usrMsgs = msgList.filter(msg => {
                if (msg.author.id == usr.user.id){
                    return msg
                }
            })
            if (usrMsgs.array().length == 0) {
                //IF THE USER HAS BEEN INACTIVE FOR MORE THAN THE WARNING TIME BUT LESS THAN THE WARNING TIME PLUS ONE INTERATION, MESSAGE (TO KEEP FROM SPAMMING)
                if((now - usr.joinedTimestamp) < (settings.warningTime + settings.iterator)){
                    sendWarning(usr)
                }
            }
        }
    })
}

exports.kick = function(userList, msgList){
    userList.forEach(usr => {
        let now = new Date().getTime()
        //FILTERING OUT MESSAGES FROM THE REQUESTED USER
        let usrMsgs = msgList.filter(msg => {
            if (msg.author.id == usr.user.id){
                return msg
            }
        })
        //IF THE USER HAS JOINED AND NOT POSTED PRIOR TO THE ESTABLISHED `KICK TIME` BOOT THEM
        if((now - usr.joinedTimestamp > settings.kickTime) && usrMsgs.array().length == 0){
            usr.kick('Did not verify within the specified time.')
        }
        else if(now - usr.joinedTimestamp > (settings.kickTime * 24)){
            usr.kick('User posted however no one verified within the allotted time.')
        }
    })
}