import axios from 'axios'
import { serverUri } from '@/config'

export default {
  namespaced: true,
  state: {
    userList: [],
  },
  mutations: {
    addUser (state, payload) {
        state.userList = payload;
    },
  },
  actions: {
    addUserAction ({commit}, payload) {
        commit('addUser', payload)
    },
  },
}
