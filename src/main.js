import './assets/css/main.css'
import '@fontsource-variable/inter';
import '@fontsource-variable/open-sans';
import '@fortawesome/fontawesome-free/css/all.min.css';


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'
import Cosmo from '@/presets/cosmo';
import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';

const app = createApp(App)

app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)
app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(ConfirmationService);
app.use(PrimeVue, {
  unstyled: true,
  ripple: true,
  pt: Cosmo
})
app.mount('#app')
