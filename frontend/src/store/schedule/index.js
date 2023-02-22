export default {
    namespaced: true,
    state: {
      year: null,
      week: null,
      domicile: null
    },
    mutations: {
      addData (state, payload) {
          state.year = payload.year;
          state.week = payload.week;
          state.domicile = payload.domicile;
      },
    },
    actions: {
      addDataAction ({commit}, payload) {
          commit('addData', payload)
      },
    },
  }
  