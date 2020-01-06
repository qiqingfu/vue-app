import Vue from 'vue';
import Monning from 'morning-ui';
import App from './App.vue';
import store from '@/store';
import { install as Router, router } from '@/router';
import { i18n } from '@/locales/';
import 'morning-ui/dist/morning-ui.css';
import '@/styles/index.scss';

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Monning);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
