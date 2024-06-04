/* 建立斜線指令 */
import { SlashCommandBuilder } from 'discord.js';

// 匯出物件
export const command = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('ping command')

export const action = async (ctx) => {
	ctx.reply('Pong!');
}
