import {
  createApp
} from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import JsonViewer from 'vue-json-viewer'

const app = createApp(App)

app.use(JsonViewer)
app.mount('#app')