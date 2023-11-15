import { createApp } from 'vue';
import './style.css';
import store from './store';
import App from './App.vue';

const app = createApp(App);

app.provide('store', store);

app.mount('#app');