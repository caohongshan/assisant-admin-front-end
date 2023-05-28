import Vue from 'vue'
import App from './App'
import store from './store'
import plugin from './js_sdk/uni-admin/plugin'

Vue.config.productionTip = false

import mixin from '@/common/js/mixin.js'
Vue.mixin(mixin)

Vue.use(plugin)


App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
