const { SlashCommandBuilder } = require('discord.js');

// export let us use data in other file via require()
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};