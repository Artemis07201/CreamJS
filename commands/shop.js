const {SlashCommandBuilder, EmbedBuilder, Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription("This isn't the back of spencers")
    
    .addSubcommand(subcommand => subcommand
        .setName('list')
        .setDescription('Shows a list of everything in the shop'))

    .addSubcommand(subcommand => subcommand
        .setName('buy')
        .setDescription('Self Explanitory')

        .addIntegerOption(option => option
            .setName('item')
            .setDescription('Self Explanitory')
            .setRequired(true))
        
        .addIntegerOption(option => option
            .setName('amount')
            .setDescription('Self Explanitory')
            .setRequired(true))
        ),

    async execute(interaction, data, client){
        var embed = new EmbedBuilder()
        .setTitle('Shop')
        .setColor('1d8233')

        if(interaction.options.getSubcommand() === 'list'){

            embed.setDescription("*These items are all decorative and can be used as bragging rights*\n" +
            "1 : *Condom* - 100:candy:\n" +
            "2 : *Dildo* - 500:candy:\n" +
            "3 : *Phone* - 1000:candy:\n" +
            "4 : *Laptop* - 2500:candy:\n" +
            "5 : *Desktop PC* - 5000:candy:\n" +
            "6 : *Golden penis* - 10000:candy:")

        }

        var item = interaction.options.getInteger('item')
        var amount = interaction.options.getInteger('amount')

        var balance = parseInt(data.read(`./users/${interaction.user.id}.json`, 'currency'))

        var price
        var item_bought
        var itemI

        var x = false

        if(interaction.options.getSubcommand() === 'buy'){
            if(amount >= 1){
                if(item === 1){
                    price = 100 * amount
                    item_bought = 'condom'
                    itemI = 'Condom'
                }else if(item === 2){
                    price = 500 * amount
                    item_bought = 'dildo'
                    itemI = 'Dildo'
                }else if(item === 3){
                    price = 1000 * amount
                    item_bought = 'phone'
                    itemI = 'Phone'
                }else if(item === 4){
                    price = 2500 * amount
                    item_bought = 'laptop'
                    itemI = 'Laptop'
                }else if(item === 5){
                    price = 5000 * amount
                    item_bought = 'desktop_pc'
                    itemI = 'Desktop PC'
                }else if(item === 6){
                    price = 10000 * amount
                    item_bought = 'golden_penis'
                    itemI = 'Golden Penis'
                }else{
                    x = true
                    embed.setDescription("**Ummm... that's not a valid item sharty**")
                }

                if(!x){

                    if(balance >= price){
                        var newbalance = balance -= price
                        data.write(`./users/${interaction.user.id}.json`, 'currency', newbalance)
                        data.write(`./userInv/${interaction.user.id}.json`, item_bought, amount)
                        embed.setDescription('*Congradulatons on your new ' + itemI + '!*')
                        .setFooter({text:`You now have a balance of ${newbalance}`})
                    }else{
                        embed.setDescription('**You do not have enough :candy: for this**')
                    }
                }

            }else{
                embed.setDescription("**Ummm... that's not a valid amount sharty**")
            }
        }
        
        interaction.reply({embeds:[embed]})
    }
}