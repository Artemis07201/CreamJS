const {Client, GatewayIntentBits, Collection} = require('discord.js')
const data = require('apollo.data')
const client = new Client({intents:[GatewayIntentBits.Guilds]})

var token = data.read('config.json', 'token')

client.commands = new Collection()

const commands = data.readDir('./commands').filter(file => file.endsWith('.js'))

for(const file of commands){
    const command = require('./commands/' + file)
    try{
        client.commands.set(command.data.name, command)
    }catch(err){console.log(err)}
}

client.once('ready', () => {
    console.log(commands)
})

client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()){
        try{
            const command = client.commands.get(interaction.commandName)
            await command.execute(interaction, data, client)
        }catch(err){console.log(err)}
    }
})

client.login(token)