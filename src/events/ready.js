/* 處理 ClientReady 事件 */
// 當機器人已經成功登入並準備好接收指令時會觸發

const { Events } = require('discord.js');

// 匯出物件，包含 name 及 execute 屬性
module.exports = {
    // 事件名稱
	name: Events.ClientReady,
    // 只執行一次
	once: true,
	execute(client) {
		console.log(`準備完畢! 以 ${client.user.tag} 的身分登錄!`);
	},
};