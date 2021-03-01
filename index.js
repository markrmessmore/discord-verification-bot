// LIBRARIES
const   Discord       = require("discord.js")
        
// FILES
const   newMember     = require('./memberAdd.js'),
        package       = require('./package.json'),
        settings      = require('./settings.json');

// CLIENTS
const   discordClient = new Discord.Client()

//USERS TO WATDCH
const   userList      = []

// ON READY...
discordClient.on('ready', () => {
  console.log(`${new Date()}: ${package.name} has logged in`)
  discordClient.guilds.cache.get(settings.guildId).members.fetch()
  .then(res => {
    res.forEach(mem => {
      if (mem.roles.cache.some(role => role.id == settings.roleId)){
        // console.log(mem.user.fetch())
      }
    })
    // CREATE CURRENT LIST
    // FIRE THE SETTIMEOUT FUNCTION TO PRUNE --> SHOULD WARN AFTER 5 MINUTES, DELETE AFTER 10
    // WHEN A NEW MEMBER ENTERS, ADD TO THE LIST
    // WHEN SOMEONE IS KICKED, REMOVE FROM THE LIST

    // AUTOMATIC VERIFICATION --> INDIEGOGO API TO CHECK CONTRIBUTIONS?
  })
  .catch(e  => console.error(e))
});

// LOG IN
discordClient.login(settings.discordToken);

// WHEN A NEW USER ENTERS THE SERVER
discordClient.on('guildMemberAdd', member => {
  newMember.run(Discord, member)
});

//GENERIC MESSAGE FUNCTION TO BE USED EVERYWHERE
exports.msg = function(msg){
  discordClient.channels.cache.get(settings.discordChannel).send(msg)
  .then(m => m.delete({timeout : 600000}))
  .catch(err => {
    console.log(err)
  })
}