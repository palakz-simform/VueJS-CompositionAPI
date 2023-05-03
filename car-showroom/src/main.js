import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue'
import NavBar from './components/NavBar.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)

app.component('NavBar', NavBar)
app.mount('#app')
