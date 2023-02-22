import axios from 'axios'
import { serverUri } from '@/config'

export default {
  namespaced: true,
  state: {
    taskList: ['hello world'],
  },
  mutations: {
    addTask (state, payload) {
        state.taskList = payload;
    },
  },
  actions: {
    addTaskAction ({commit}, payload) {
        commit('addTask', payload)
    },
  },
}
