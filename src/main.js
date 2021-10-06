//.env support
// require('dotenv').config()
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//load scss
import '../scss/main.scss'
//jquery


let express_server_url = "http://localhost:3000";
window.express_server_url = express_server_url;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
