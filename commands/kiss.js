const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('kiss')
    .setDescription('Self explanitory')
    .addUserOption(option => option.setName('user').setDescription('Self explanitory').setRequired(true)),
    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('Kiss')
        .setDescription('*Kisses <@' + interaction.options.getUser('user').id + '>*')
        .setColor('ffbff0')
        if(interaction.user.id === interaction.options.getUser('user').id){
            var reply = data.read('./responses/kiss_self.json', 'kiss_self')
            embed.setDescription(reply[Math.floor(Math.random()*reply.length)] + ' <@' + interaction.options.getUser('user').id + ">")
            await interaction.reply({embeds:[embed]})
        }else{
            var image = data.read('./responses/kisses.json', 'kisses')
            embed.setImage(image[Math.floor(Math.random()*image.length)])    
            if(!data.exists(`./users/${interaction.options.getUser('user').id}.json`, 'kiss_amount')){
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'kiss_amount', 1)
                embed.setFooter({text:interaction.options.getUser('user').username + ' has been kissed 1 time'})
            }else{
                var kissed = parseInt(data.read(`./users/${interaction.options.getUser('user').id}.json`, 'kiss_amount'))
                kissed += 1
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'kiss_amount', kissed)
                embed.setFooter({text:interaction.options.getUser('user').username + ` has been kissed ${kissed} times`})
            }
            await interaction.reply({embeds:[embed]})
        }
    }
}