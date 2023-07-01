import {
  createApp
} from 'vue'
import App from './App.vue'
import 'virtual:svg-icons-register'
import Vue3ColorPicker from "vue3-colorpicker";

createApp(App).use(Vue3ColorPicker).mount('#app')