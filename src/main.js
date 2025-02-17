import { createApp } from 'vue';
import router from './router';
import './index.css';

import App from './App.vue';

const app = createApp(App).use(router);

app.mount('#app');