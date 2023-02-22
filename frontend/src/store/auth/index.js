import axios from 'axios'
import { serverUri } from '@/config'

export default {
  namespaced: true,
  state: {
    authUserList: [],
  },
  mutations: {
    addAuth (state, payload) {
        state.authUserList = payload;
    },
  },
  actions: {
    addAuthAction ({commit}, payload) {
        commit('addAuth', payload)
    },
  },
}
