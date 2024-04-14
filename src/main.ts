import './styles/global.css'
import './styles/main.css'
import './styles/reset.css'
import './styles/swiper.css'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')