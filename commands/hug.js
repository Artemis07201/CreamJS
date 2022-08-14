const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Self explanitory')
    .addUserOption(option => option.setName('user').setDescription('Self explanitory').setRequired(true)),
    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('Hug')
        .setDescription('*Hugs <@' + interaction.options.getUser('user').id + '>*')
        .setColor('ffbff0')
        var image = data.read('./gifs/hugs.json', 'hugs')
        embed.setImage(image[Math.floor(Math.random()*image.length)])
        if(!data.exists(`./users/${interaction.options.getUser('user').id}.json`)){
            data.write(`./users/${interaction.options.getUser('user').id}.json`, 'hug_amount', 1)
            embed.setFooter({text:interaction.options.getUser('user').username + ' has been hugged 1 time'})
        }else{
            if(data.read(`./users/${interaction.options.getUser('user').id}.json`, 'hug_amount')){
                var hugged = parseInt(data.read(`./users/${interaction.options.getUser('user').id}.json`, 'hug_amount'))
                hugged += 1
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'hug_amount', hugged)
                embed.setFooter({text:interaction.options.getUser('user').username + ` has been hugged ${hugged} times`})
            }else{
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'hug_amount', 1)
                embed.setFooter({text:interaction.options.getUser('user').username + ' has been hugged 1 time'})
            }
        }
        await interaction.reply({embeds:[embed]})
    }
}