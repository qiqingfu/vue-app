import Vue from 'vue';
import Monning from 'morning-ui';
import App from './App.vue';
import store from '@/store';
import { install as Router, router } from '@/router';
import 'morning-ui/dist/morning-ui.css';
import '@/styles/index.scss';

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Monning);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
