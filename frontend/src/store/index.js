import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import auth from './auth'
import tasks from './tasks'
import users from './users'
import drivers from './drivers'
import payroll from './payroll'
import schedule from './schedule'
import settlement from './settlement'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    auth,
    tasks,
    users,
    schedule,
    driversStore: drivers,
    payrollStore: payroll,
    settlementStore: settlement,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
})
