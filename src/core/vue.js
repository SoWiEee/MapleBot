import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 導出函式
export default () => {
console.log('vue init')

    const vue = createApp({})
    const pinia = createPinia()

    vue.use(pinia)
}
