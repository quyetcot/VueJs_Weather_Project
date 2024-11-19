import { createApp } from 'vue';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import App from './App.vue';

const app = createApp(App);
app.use(Buefy);
app.mount('#app');
