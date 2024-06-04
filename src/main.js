import { Client, Events, GatewayIntentBits } from 'discord.js'
import vueinit from '@/core/vue'
import dotenv from 'dotenv'
import { loadCommands, loadEvents } from '@/core/loader'
import { useAppStore } from '@/store/app'

vueinit()
dotenv.config()
loadCommands()

// 建立機器人實體
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const appStore = useAppStore()
appStore.client = client

loadEvents()

client.login(process.env.TOKEN);