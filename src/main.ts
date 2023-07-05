import {
  createApp
} from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import JsonViewer from 'vue-json-viewer'

import * as directives from '@/utils/directives';


const app = createApp(App)

Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string ]: Directive })[key]);
});
app.use(JsonViewer)
app.mount('#app')