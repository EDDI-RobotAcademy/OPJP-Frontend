import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './pulgins/vuetify'
import { loadFonts } from './pulgins/webfontloader'

loadFonts()

createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .use('#app')