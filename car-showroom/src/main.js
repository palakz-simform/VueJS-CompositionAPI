import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue'
import NavBar from './components/Nav-bar.vue'
import '../public/style.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)

app.component('NavBar', NavBar)
app.mount('#app')
