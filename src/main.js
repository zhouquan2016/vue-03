import Vue from 'vue'
import App from './Test.vue'
import router from './router'

import { Menu, Layout, Breadcrumb, Icon,Button } from "ant-design-vue";
Vue.config.productionTip = false
Vue.use(Menu);
Vue.use(Layout);
Vue.use(Breadcrumb);
Vue.use(Icon);
Vue.use(Button);

window.app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
