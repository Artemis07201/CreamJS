const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Self explanitory')

    .addUserOption(option => option
        .setName('user')
        .setDescription('Self explanitory')
        .setRequired(true)),

    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('Hug')
        .setDescription('*Hugs <@' + interaction.options.getUser('user').id + '>*')
        .setColor('ffbff0')
        
        if(interaction.user.id === interaction.options.getUser('user').id){
            var reply = data.read('./responses/hug_self.json', 'hug_self')
            embed.setDescription(reply[Math.floor(Math.random()*reply.length)] + ' <@' + interaction.options.getUser('user').id + ">")
        }else{
            var image = data.read('./responses/hugs.json', 'hugs')
            embed.setImage(image[Math.floor(Math.random()*image.length)])
            
            if(!data.exists(`./users/${interaction.options.getUser('user').id}.json`, 'hug_amount')){
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'hug_amount', 1)
                embed.setFooter({text:interaction.options.getUser('user').username + ' has been hugged 1 time'})
            }else{
                var hugged = parseInt(data.read(`./users/${interaction.options.getUser('user').id}.json`, 'hug_amount'))
                hugged += 1
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'hug_amount', hugged)
                embed.setFooter({text:interaction.options.getUser('user').username + ` has been hugged ${hugged} times`})
            }
        }

        await interaction.reply({embeds:[embed]})
    }
}