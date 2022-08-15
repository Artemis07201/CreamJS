const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')
const worked = new Set()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('whoreout')
    .setDescription('Get that bag sis'),

    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('Whore')
        .setColor('e34b62')

        if(worked.has(interaction.user.id)){
            embed.setDescription('**You cannot whore out for another minute sharty bae**')
        }else{
            var aoc = data.read(`./data/whore.json`, 'amount_of_customers')
            var amount_of_customers = aoc[Math.floor(Math.random()*aoc.length)]
            var earned = 20 * amount_of_customers
            var newBalance = parseInt(data.read(`./users/${interaction.user.id}.json`, 'currency')) + earned

            data.write(`./users/${interaction.user.id}.json`, 'currency', newBalance)

            embed.setDescription(`You had ${amount_of_customers} customers this time !\nYou have earned ${earned}:candy: !!`)
            .setFooter({text:`You now have a balance of ${newBalance}`})

            worked.add(interaction.user.id)
            setTimeout(() => {
                worked.delete(interaction.user.id)
            }, 60000)
        }

        interaction.reply({embeds:[embed]})
    }
}