import Vue from 'vue';
import App from './App.vue';
import Elemenuui from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(Elemenuui);
new Vue({
    render: h => h(App),
}).$mount('#app');
