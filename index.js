// LIBRARIES
const   Discord       = require("discord.js")
        
// FILES
const   discordMsg    = require('./discordMsg.js'),
        newMember     = require('./memberAdd.js'),
        package       = require('./package.json'),
        settings      = require('./settings.json'),
        timer         = require('./timer.js');

// CLIENTS
const   discordClient = new Discord.Client();

//VARIABLES
var     guild               = null,
        msgChannel          = null,
        userList            = [],
        verificationChannel = null;

// ON READY...
discordClient.on('ready', () => {
  console.log(`${new Date()}: ${package.name} has logged in`)
  
  //REDEFINE VARIABLES
  guild               = discordClient.guilds.cache.get(settings.guildId),
  msgChannel          = discordClient.channels.cache.get(settings.msgChannel)
  verificationChannel = discordClient.channels.cache.get(settings.verificationChannel)
  
  // AT TIME OF LOGIN THE BOT FETCHES ALL GUILD MEMBERS AND FILTERS OUT THOSE WITH THE SPECIFIED ROLE (LIKELY 'UNVERIFIED' OR SOMETHING SIMILAR)
  let getAllMembers = function(){
    userList = []
    guild.members.fetch()
    .then(res => {
      res.forEach(mem => {
        if (mem.user.bot == true) {
          return
        }
        else {
          if (mem.roles.cache.some(role => role.id == settings.roleId)){
            userList.push(mem)
          }
        }
      })
    })
    .catch(e  => console.error(e))
  }
  
  //TRIGGERS THE CHECKS EVERY ONE MINUTE. IF THOSE WHO ARE A PART OF THE USERLIST HAVE NOT SPOKEN IN THE ESTABLISHED AMOUNT OF TIME (SEE settings.json) THEY ARE WARNED OR KICKED (no kicking happens if 'testing' is set to 'true' in settings.json).
  let checkUsers = function (){
    console.log(`${userList.length} users needing to verify.`)
    
    //RETRIEVES EVEN MESSAGES POSTED PRIOR TO BOT BEING LOGGED IN (IN CASE THE BOT REBOOTS)
    setTimeout(() => {
      verificationChannel.messages.fetch()
      .then(msgList => {
        if (userList.length > 0){
          timer.warn(userList, msgList)
          timer.kick(userList, msgList)
        }
      })
      .catch(e => console.log(e))
      checkUsers()
      getAllMembers()

    }, settings.iterator)
  }
  checkUsers()

    // AUTOMATIC VERIFICATION --> INDIEGOGO API TO CHECK CONTRIBUTIONS?
})

//MESSAGE HANDLER
// discordClient.on('message', message => {
//   // IF THE MESSAGE IS FROM THE BOT
//   if (message.author.bot) {
//     return
//   }
//   //IF IT DOES NOT USE THE PREFIX
//   else if (!message.content.startsWith(settings.discordPrefix)) {
//     return
//   }
//   else {
//     try {
//       let command = message.content.split(" ")[0];
//       command = command.slice(settings.discordPrefix.length);
//       discordMsg[command](message);
//     }
//     catch(err) {
//       exports.msg('That command did not work. Try again', 15000)
//     }
//   }
// });


// LOG IN
discordClient.login(settings.discordToken);

// WHEN A NEW USER ENTERS THE SERVER
discordClient.on('guildMemberAdd', member => {
  //ENSURE THIS MEMBER HAS THE 'UNVERIFIED' ROLE
  let role = guild.roles.cache.find(role => role.id === settings.roleId);
  member.roles.add(role)
  
  userList.push(member)
  setTimeout(() => {
    newMember.run(Discord, settings, member)
  }, 10000)
});

//WHEN A USER LEAVES THE SERVER, REMOVE FROM THE LIST (IF THEY ARE ON IT)
discordClient.on('guildMemberRemove', member => {
  let remainingUsers = userList.filter(usr => usr.user.username !== member.user.username)
  userList = remainingUsers
})

//GENERIC MESSAGE FUNCTION TO BE USED EVERYWHERE
exports.msg = function(msg, time){
  msgChannel.send(msg)
  .then(m => m.delete({timeout : time}))
  .catch(err => {
    console.log(err)
  })
}