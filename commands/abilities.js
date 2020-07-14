const Discord = require('discord.js');
module.exports = {
	name: 'abilities',
	description: 'Lists your character\'s abilities.',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 3,
	async execute(client, message, args, Items, Areas, Containers, Inventories, Abilities) {
        const taggedUser = message.author;

        try {
            const inventory = await Inventories.findOne({ where: { id: taggedUser.id.toString(), guild: message.guild.toString() } });
            if (!inventory) {
            	return message.reply('You must have a valid inventory.');
            } else {
                let abilitiesTemp = inventory.get('abilities');
                if (typeof abilitiesTemp === 'undefined') abilitiesTemp = '';

								const abils = abilitiesTemp.split(/,+/);

								var abilsList = [];

								for (let a = 0; a < abils.length; a++) {
									const ability = await Abilities.findOne({ where: { name: abils[a], guild: message.guild.toString() } });

									if (!ability) {
			            	 	abilsList[a] = await message.channel.send('Ability not found.');
			            } else {
			                let messageTemp = '';
			                let nameTemp = ability.get('name');
			                let descriptionTemp = ability.get('description');
			                let effectTemp = ability.get('effect');
			                messageTemp += `\nName: ${nameTemp}\nDescription: ${descriptionTemp}\nEffect: ${effectTemp}\n`;

			                abilsList[a] = await message.channel.send(messageTemp);
			            }
								}

                const message2 = await message.channel.send("Delete message? React 👌 to delete.");
                message2.react('👌');

                const filter = (reaction, user) => {
                	return reaction.emoji.name === '👌' && user.id === message.author.id;
                };

                const collector = message2.createReactionCollector(filter, { time: 100000 });

                collector.on('collect', async (reaction, reactionCollector) => {
										for (let i = 0; i < abilsList.length; i++) {
											await abilsList[i].delete();
										}
                    await message2.delete();
                    await message.delete();
                });
            }
        }
        catch (e) {
        	return message.reply(`Something went wrong looking up your abilities. Error: ${e}`);
        }
	},
};
