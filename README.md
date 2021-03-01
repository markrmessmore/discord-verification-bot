# Discord Verification Bot

## Acknowledgements
I want to begin by giving credit where it is due. The idea for this originally came from [LDShires](https://github.com/Ishidres)'s work: [Discord-Inactive-User-Kick](https://github.com/Ishidres/discord-inactive-user-kick). However I found that there were a lot of customizations and differences I wanted, so I branched out (see what I did there?) and wrote my own.

## Setup
- Install [Node.js](https://nodejs.org/en/)
- Install [discord.js](https://www.npmjs.com/package/discord.js/) using `npm i discord.js (I used 12.5.1 in my development)`
- Create a new Discord bot [you can do that here](https://discordapp.com/developers/applications/) and invite it to your Discord server.
- Copy `settings-example.json` to `settings.json` (or simply rename it)
- Add the bot's token to `settings.json` and adjust the configuration for your purposes *(see configuration details below)*
- Configure your Discord server to have a specified role which users will receive upon entering prior to being verified.
- Run the bot by using `node index.js` or any other command you prefer

## Logic (i.e. How this is supposed to work)
- A user enters your discord server in the default channel with an *Unverified* role (or however you choose to label it)
- A welcome message is displayed to the user identifying the amount of time they have been given to verify
- If there has been no communciation from the user in the channel after the `warningTime` a message will be sent wherein the user is mentioned as a reminder to verify
- The bot takes into consideration messages sent in case there is communication happening to verify. Therefore time resets with each submitted message.
- If no verification or communication has happened within the `kickTime` the user will be kicked.
- As of now whatever role is verifying **MUST** also remove the initial *Unverified* role the user was given upon entry.

## Configuration (settings.json)
| Setting               | Explanation                                                                                                       |
|-----------------------| ----------------------------------------------------------------------------------------------------------------- |           
| adminRole             | Currently unused, may incorporate if I add a programmatic way to verify users
| discordToken          | Your handy-dandy token available when you create your discord bot in the [Discord Developer Area](https://discordapp.com/developers/applications/)
| guildId               | Your guild ID
| guildName             | The name you want to present in your welcome message to new arrivals
| iterator              | How often the bot checks the users for verification (in milliseconds)
| kickTime              | How long before a user is kicked for inactivity and lack of verification (in milliseconds)
| msgChannel            | Channel ID for where you want the bot to send messages on your server (welcome, warnings, etc.). Likely the default channel
| roleId                | The ID for the role you created which will be given to new users upon entry
| verificationChannel   | The channel where you will watch for activity to verify the user. Likely the same as *msgChannel* however I coded it this way just in case you wanted to do it differently
| warningTime           | How long a user can be connected and inactive before receiving a warning reminding them to verify
| welcomeMsg            | The message you want to use to welcome your new members.
