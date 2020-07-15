module.exports = {
	name: 'deleteareas',
	description: 'Deletes all areas and associated containers.',
    args: false,
    usage: '',
    guildOnly: true,
    cooldown: 3,
	async execute(client, message, args, database) {

        try {
            const area = await database[1].destroy({ where: { guild: message.guild.id.toString() } });
            if (!area) return message.reply('No areas found.');

            try {
                const container = await database[2].destroy({ where: { guild: message.guild.id.toString() } });
            }
            catch (e) {
            	return message.reply(`Something went wrong deleting containers. Error: ${e}`);
            }

            return message.reply(`Deleted all areas and associated containers.`);
        }
        catch (e) {
        	return message.reply(`Something went wrong deleting areas. Error: ${e}`);
        }
	},
};
