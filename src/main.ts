import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'

// import '@unocss/reset/tailwind.css'
import 'uno.css'
import './style/base.less'
// import './test/index'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(location.pathname === '/FFXIVTwinHelper/' ? '/FFXIVTwinHelper/' : undefined),
  // history: createWebHashHistory(),
  routes,
})
app.use(router)
app.mount('#app')
