import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    // 路徑別名
    resolve: {
        alias: {
            // @ -> ./src
            '@': path.resolve(__dirname, './src'),
        },
    },
})
