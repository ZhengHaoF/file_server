import { createApp } from 'vue'
import App from './App.vue'
import { createAppRouter } from './router/index.js'
import { PREVIEW } from './lib/env.js'
import { initTheme } from './composables/useTheme.js'
import './styles/base.css'

initTheme()
// Preview builds may be embedded under an arbitrary base path: use in-memory history starting at /overview.
const router = createAppRouter({ memory: PREVIEW })
if (PREVIEW) router.push('/overview')
createApp(App).use(router).mount('#app')
