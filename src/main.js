// 與檔案系統互動
const fs = require('node:fs');
// 處理檔案和目錄路徑
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
// 匯入環境變數
const dotenv = require('dotenv');

dotenv.config();

// 建立一個 instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// 儲存指令
client.commands = new Collection();
// 建立一個 path 指向 commands 資料夾
const foldersPath = path.join(__dirname, 'commands');
// 讀取 commands 資料夾中的所有子資料夾
const commandFolders = fs.readdirSync(foldersPath);

// 遍歷所有子資料夾
for (const folder of commandFolders) {
    // 建立 path 指向 folder
	const commandsPath = path.join(foldersPath, folder);
    // 讀取 folder 中的所有 .js
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // only leave .js
	
    // 遍歷所有 .js 檔
    for (const file of commandFiles) {
        // 建立 path 指向 .js
		const filePath = path.join(commandsPath, file);
        // 匯入 .js 檔，其中匯出 1 個物件包含 data, execute 屬性
		const command = require(filePath);

		// check
        if ('data' in command && 'execute' in command){
            // 將指令加進 client.commands 中
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] 位於 ${filePath} 的指令缺少 "data" or "execute" 屬性`);
		}
	}
}

// 建立一個 path 指向 events 資料夾
const eventsPath = path.join(__dirname, 'events');
// 讀取 events 資料夾中的所有 .js
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// 遍歷所有 .js
for (const file of eventFiles) {
    // 建立 path 指向 .js
	const filePath = path.join(eventsPath, file);
    // 匯入 .js 檔，其中匯出 1 個物件包含 name, execute 屬性
	const event = require(filePath);

    // check
	if (event.once) {
        // 使用 client.once 註冊事件
		client.once(event.name, (...args) => event.execute(...args));
	} else {
        // 使用 client.on 註冊事件
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// 登錄
client.login(process.env.TOKEN);