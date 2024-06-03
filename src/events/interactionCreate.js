/* 處理 Interaction 事件 */
// 當用戶與機器人互動時會觸發，如發送指令

const { Events } = require('discord.js');

// 匯出物件，包含 name 及 execute 屬性
module.exports = {
    // 事件名稱
	name: Events.InteractionCreate,
    // async 在該事件發生時會執行
    // ctx 物件包含事件相關的資訊
	async execute(ctx) {
        // 檢查是否為聊天輸入指令，不是就 return
		if (!ctx.isChatInputCommand()) return;

        // 從指令集中獲取對應的指令
		const command = ctx.client.commands.get(ctx.commandName);

        // 檢查是否有找到指令
		if (!command) {
			console.error(`沒有指令對應到 ${ctx.commandName} !`);
			return;
		}

		try {
            // 執行找到的指令
			await command.execute(ctx);
		} catch (error) {
            // 輸出錯誤
			console.error(error);
            
			if (ctx.replied || ctx.deferred) {
				await ctx.followUp({ content: '執行該指令的時候發生錯誤!', ephemeral: true });
			} else {
				await ctx.reply({ content: '執行該指令的時候發生錯誤!', ephemeral: true });
			}
		}
	},
};