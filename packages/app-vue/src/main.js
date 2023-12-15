import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { ComponentLibrary } from 'vue-library';

createApp(App).use(ComponentLibrary).mount('#app')
