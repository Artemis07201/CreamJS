const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription("Checks yours or someone else's balance")

    .addUserOption(option=> option
        .setName('user')
        .setDescription('Self Explanitory')
        .setRequired(false)),

    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('Balance')
        .setColor('1d8233')

        if(interaction.options.getUser('user') === null){
            if(!data.exists(`./users/${interaction.user.id}.json`, 'currency')){
                data.write(`./users/${interaction.user.id}.json`, 'currency', 500)
            }

            var currency = parseInt(data.read(`./users/${interaction.user.id}.json`, 'currency'))
            embed.setDescription(`You have ${currency}:candy: in your account!`)
        }else{
            if(!data.exists(`./users/${interaction.options.getUser('user').id}.json`, 'currency')){
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'currency', 500)
            }

            var currency = parseInt(data.read(`./users/${interaction.options.getUser('user').id}.json`, 'currency'))
            embed.setDescription(`<@${interaction.options.getUser('user').id}> has ${currency}:candy: in their account!`)
        }
        
        await interaction.reply({embeds:[embed]})
    }
}