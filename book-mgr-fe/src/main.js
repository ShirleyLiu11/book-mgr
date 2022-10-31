import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import "ant-design-vue/dist/antd.css";
import SpaceBetween from './components/SpaceBetween/index.vue';



createApp(App)
    .use(router)
    .use(Antd)
    .component('space-between', SpaceBetween)
    .mount('#app');
