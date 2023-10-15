import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import '@/assets/styles/styles.scss';
import 'primeicons/primeicons.css';

// Импорт primeVue компонентов
import PrimeVue from 'primevue/config';
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import InputText from "primevue/inputtext";

const app = createApp(App)

app.use(PrimeVue);

// Раздел добавления primeVue компонентов
app.component('InputSwitch', InputSwitch);
app.component('Button', Button);
app.component('InputText', InputText);
//

app.mount('#app')
