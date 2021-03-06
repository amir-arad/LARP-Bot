module.exports = {
	name: 'listinventories',
	description: 'List all inventories.',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 3,
	async execute(client, message, args, database) {

				if (!message.member.roles.cache.some(role => role.name === 'GM') && !message.member.roles.cache.some(role => role.name === 'Head GM')) {
					return message.reply(`You don't have GM permissions.`);
				}

				try {
            const inventory = await database[3].findAll({ where: { guild: message.guild.id.toString() } });
            if (!inventory) {
            	return message.reply('No inventories found.');
            } else {
                for (let i = 0; i < inventory.length; i++) {
                    let idTemp = inventory[i].get('id');
                    let nameTemp = inventory[i].get('name');
                    let itemsTemp = inventory[i].get('items');
                    if (typeof itemsTemp === 'undefined') itemsTemp = 'none';
                    let abilitiesTemp = inventory[i].get('abilities');
                    if (typeof abilitiesTemp === 'undefined') abilitiesTemp = 'none';
										let memsTemp = inventory[i].get('mems');
		                if (typeof memsTemp === 'undefined') memsTemp = 'none';
                    let stringTemp = `\nCharacter Name: ${nameTemp}\nItems: ${itemsTemp}\nAbilities: ${abilitiesTemp}\nMemory Packets: ${memsTemp}\n`;
										if (stringTemp.length > 2000) {
											stringTemp.truncate(0,1997);
											stringTemp += '...';
										}
										message.channel.send(stringTemp);
                }
								if (inventory.length < 1) {
									message.channel.send(`No inventories found.`);
								}
                return;
            }
        }
        catch (e) {
        	return message.reply(`Something went wrong looking up an inventory. Error: ${e}`);
        }
	},
};
