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
            else if (
                (   (now - usrMsgs.last().createdTimestamp) > settings.kickTime )   &&
                (   (now - usrMsgs.last().createdTimestamp) < (settings.warningTime + settings.iterator )   )
            ){
                sendWarning(usr)
            }
        }
    })
}

exports.kick = function(userList, msgList){
    userList.forEach(usr => {
        let now = new Date().getTime()
        //FIRST CHECK IF THE USER HAS BEEN CONNECTED TO THE SERVER LONGER THAN THE ESTABLISHED 'KICK TIME'
        if (now - usr.joinedTimestamp > settings.kickTime){
            //FILTER OUT SO WE ONLY HAVE THIS USER'S MESSAGES
            let usrMsgs = msgList.filter(msg => {
                if (msg.author.id == usr.user.id){
                    return msg
                }
            })
            if (usrMsgs.array().length == 0 || ((now - usrMsgs.last().createdTimestamp) > settings.kickTime)){
                usr.kick('Did not verify within the specified time.')
            }
        }
    })
}