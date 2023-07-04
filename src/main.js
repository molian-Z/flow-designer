import {
  createApp
} from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import Vue3ColorPicker from "vue3-colorpicker";
import JsonViewer from 'vue-json-viewer'

createApp(App).use(Vue3ColorPicker).use(JsonViewer).mount('#app')