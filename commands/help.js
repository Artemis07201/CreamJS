const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows every cream command'),
    
    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('Help')
        .setDescription('Bot Owner commands -\n\n' +
            '*/admin - Makes someone a bot admin*\n\n' +
            'Bot admin commands -\n\n' +
            "*/editbalance - Edits the given user's balance*\n\n" +
            "Economy commands -\n\n" +
            "*/balance - Shows your balance or someone else's*\n" +
            "*/transfer - Transfers :candy: from your account to someone else's*\n" +
            "*/whoreout - The classic job, have fun standing on the corner !*\n\n" +
            "Affection commands -\n\n" +
            "*/hug - Allows you to hug another user*\n" +
            "*/kiss - Allows you to kiss another user*")

        await interaction.reply({embeds:[embed]})
    }
}