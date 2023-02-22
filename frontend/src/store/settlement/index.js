export default {
  namespaced: true,
  state: {
    uploadlist: [],
  },
  mutations: {
    addData (state, payload) {
        state.uploadlist = payload;
    },
  },
  actions: {
    addDataAction ({commit}, payload) {
        commit('addData', payload)
    },
  },
}
