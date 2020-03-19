import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueSocketIOExt from 'vue-socket.io-extended'
import io from 'socket.io-client'

import DataTable from 'primevue/datatable'
Vue.component('DataTable', DataTable)

import Column from 'primevue/column'
Vue.component('Column', Column)

import ColumnGroup from 'primevue/columngroup'
Vue.component('ColumnGroup', ColumnGroup)

import InputText from 'primevue/inputtext'
Vue.component('InputText', InputText)

import Calendar from 'primevue/calendar'
Vue.component('Calendar', Calendar)

import MultiSelect from 'primevue/multiselect'
Vue.component('MultiSelect', MultiSelect)

import Toast from 'primevue/toast'
Vue.component('Toast', Toast)

import Button from 'primevue/button'
Vue.component('Button', Button)

import Dialog from 'primevue/dialog'
Vue.component('Dialog', Dialog)

import Checkbox from 'primevue/checkbox'
Vue.component('Checkbox', Checkbox)

import ToggleButton from 'primevue/togglebutton'
Vue.component('ToggleButton', ToggleButton)

import ProgressBar from 'primevue/progressbar'
Vue.component('ProgressBar', ProgressBar)

import Dropdown from 'primevue/dropdown'
Vue.component('Dropdown', Dropdown)

import BlockUI from 'primevue/blockui'
Vue.component('BlockUI', BlockUI)

import ProgressSpinner from 'primevue/progressspinner'
Vue.component('ProgressSpinner', ProgressSpinner)

import Message from 'primevue/message'
Vue.component('Message', Message)

import 'primevue/resources/themes/nova-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '@/assets/myCss.css'

import ToastService from 'primevue/toastservice'
Vue.use(ToastService)

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.config.performance = true

const socket = io('http://127.0.0.1:3000')
Vue.use(VueSocketIOExt, socket, { store })

String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
