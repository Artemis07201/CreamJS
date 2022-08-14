const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('editbalance')
    .setDescription("Changes someone's balance")

    .addUserOption(option => option
        .setName('user')
        .setDescription('Self explanitory')
        .setRequired(true))

    .addIntegerOption(option => option
        .setName('amount')
        .setDescription('The amount of :candy: you are adding or subtracting')
        .setRequired(true)),

    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('New Balance!')

        if(data.exists(`./users/${interaction.user.id}.json`, 'admin')){
            if(!data.exists(`./users/${interaction.options.getUser('user').id}.json`, 'currency')){
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'currency', 500)
            }
            var currency = parseInt(data.read(`./users/${interaction.options.getUser('user').id}.json`, 'currency')) + interaction.options.getInteger('amount')
            data.write(`./users/${interaction.options.getUser('user').id}.json`, 'currency', currency)
            embed.setDescription(`<@${interaction.options.getUser('user').id}> now has ${currency}:candy: in their account !`)

            console.log(`${interaction.user.username} has changed the balance of ${interaction.options.getUser('user').username} by ${interaction.options.getInteger('amount')}`)
        }else{
            embed.setDescription("**You don't have permission to use this command !**")
        }

        await interaction.reply({embeds:[embed]})
    }
}