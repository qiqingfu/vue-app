import Vue from 'vue';
import Monning from 'morning-ui';
import Meta from 'vue-meta';
import App from './App.vue';
import store from '@/store';
import { install as Router, router } from '@/router';
import { i18n } from '@/locales/';
import { install as Http } from '@/dao/http';
import 'morning-ui/dist/morning-ui.css';
import '@/styles/index.scss';

Vue.config.productionTip = false;

Vue.use(Router);
Vue.use(Monning);
Vue.use(Meta);
Vue.use(Http);

Vue.prototype.$preMeta = modifier => `common.meta.${modifier}`;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
