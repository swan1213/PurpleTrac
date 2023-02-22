import axios from 'axios'
import { serverUri } from '@/config'

export default {
  namespaced: true,
  state: {
    payroll: {},
    fixed_rate: [],
  },
  mutations: {
    addPayroll (state, payload) {
        state.payroll = payload;
    },
    addFR (state, payload) {
        state.fixed_rate = payload
    }
  },
  actions: {
    addPayrollAction ({commit}, payload) {
        commit('addPayroll', payload)
    },
    addFRAction ({commit}, payload) {
        commit('addFR', payload)
    }
  },
}
