import Vue from 'vue';
import App from './App.vue';
import { install as Router, router } from '@/router';

import '@/styles/index.scss';

Vue.config.productionTip = false;

Vue.use(Router);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
