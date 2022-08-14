const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('botadmin')
    .setDescription("Gives someone the permission to certain bot commands")

    .addUserOption(option => option
        .setName('user')
        .setDescription('Self explanitory')
        .setRequired(true)),
    
    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('New bot admin!')

        if(data.exists(`./users/${interaction.user.id}.json`, 'owner')){
            if(!data.exists(`./users/${interaction.options.getUser('user').id}.json`, 'admin')){
                data.write(`./users/${interaction.options.getUser('user').id}.json`, 'admin', 1)
                embed.setDescription(`<@${interaction.options.getUser('user').id}> is now a bot admin`)
            }else{
                embed.setDescription(`<@${interaction.options.getUser('user').id}> is already a bot admin`)
            }
        }else{
            embed.setDescription("**You don't have permission to use this command !**")
        }
        await interaction.reply({embeds:[embed]})
    }
}