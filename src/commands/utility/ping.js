/* 建立斜線指令 */

const { SlashCommandBuilder } = require('discord.js');

// 匯出物件
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(ctx) {
		await ctx.reply('Pong!');
	},
};