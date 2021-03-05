import { createApp } from 'vue'
import { router } from '/@/composition/router'
import { RouterLink, RouterView } from 'vue-router'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.component('RouterLink', RouterLink)
app.component('RouterView', RouterView)

app.mount('#app')
