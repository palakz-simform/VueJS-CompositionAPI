import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from "./includes/i18n";
import router from './router/index'
import App from './App.vue'
import NavBar from './components/NavBar.vue'
import axios from 'axios';

axios.defaults.baseURL = 'https://testapi.io/api/dartya/resource/'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
})

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(i18n)
app.component('NavBar', NavBar)
app.mount('#app')
