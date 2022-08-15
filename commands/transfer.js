const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('transfer')
    .setDescription("Transfers :candy: from your account to someone else's")

    .addUserOption(option=> option
        .setName('user')
        .setDescription('SelfExplanitory')
        .setRequired(true))
    
    .addIntegerOption(option=> option
        .setName('amount')
        .setDescription('The amount of :candy: that you would like to transfer')
        .setRequired(true)),

    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('Transfer')
        .setColor('1d8233')

        if(!data.exists(`./users/${interaction.user.id}.json`, 'currency')){
            data.write(`./users/${interaction.user.id}.json`, 'currency', 500)
        }

        if(!data.exists(`./users/${interaction.options.getUser('user').id}.json`, 'currency')){
            data.write(`./users/${interaction.options.getUser('user').id}.json`, 'currency', 500)
        }

        var transferBalance = parseInt(interaction.options.getInteger('amount'))

        if(transferBalance < 0){
            embed.setDescription("**You can't take money from other peoples' accounts**")
        }else if(transferBalance === 0){
            embed.setDescription("**Aren't you gonna send any money??**")
        }else{
            var userBalance1 = parseInt(data.read(`./users/${interaction.user.id}.json`, 'currency'))
            var userBalance2 = parseInt(data.read(`./users/${interaction.options.getUser('user').id}.json`, 'currency'))

            var giveNewBalance = userBalance1 -= transferBalance
            var receiveNewBalance = userBalance2 += transferBalance

            if(userBalance1 >= transferBalance){
                data.write(`./users/${interaction.user.id}.json`, 'currency', giveNewBalance)
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'currency', receiveNewBalance)
                embed.setDescription(`<@${interaction.user.id}> has given <@${interaction.options.getUser('user').id}> ${transferBalance}:candy: !`)
            }else{
                embed.setDescription('**You do not have enough money**')
            }
        }
        
        interaction.reply({embeds:[embed]})
    }
}