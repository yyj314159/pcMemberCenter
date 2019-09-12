import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js';
import store from './store';
import App from './App.vue';

import InterfaceAddr from './assets/js/InterFaceAddr';
Vue.prototype.InterfaceAddr = InterfaceAddr;

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
if (module.hot) {
  module.hot.accept();
}