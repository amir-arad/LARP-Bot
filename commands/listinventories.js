module.exports = {
	name: 'listinventories',
	description: 'List all inventories.',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 3,
	async execute(client, message, args, Items, Areas, Containers, Inventories, Abilities) {

        try {
            const inventory = await Inventories.findAll({ where: { guild: message.guild.toString() } });
            if (!inventory) {
            	return message.reply('No inventories found.');
            } else {
                let messageTemp = '';
                for (let i = 0; i < inventory.length; i++) {
                    let idTemp = inventory[i].get('id');
                    let nameTemp = inventory[i].get('name');
                    let itemsTemp = inventory[i].get('items');
                    if (typeof itemsTemp === 'undefined') itemsTemp = 'none';
                    let abilitiesTemp = inventory[i].get('abilities');
                    if (typeof abilitiesTemp === 'undefined') abilitiesTemp = 'none';
                    messageTemp += `\nUser: <@${idTemp}>\nCharacter Name: ${nameTemp}\nItems: ${itemsTemp}\nAbilities: ${abilitiesTemp}\n`;
                }
				if (inventory.length === 0) {
					messageTemp = 'No inventories found.';
				}
                return message.reply(messageTemp);
            }
        }
        catch (e) {
        	return message.reply(`Something went wrong looking up an inventory. Error: ${e}`);
        }
	},
};
