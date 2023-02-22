import axios from 'axios'
import { serverUri } from '@/config'

export default {
  namespaced: true,
  state: {
    avatar: null,
    driversList: [],
    driversEdit: {
      driver_id: null,
      driver_name: null,
      email: null,
      phone: null,
      license: null,
      address: null,
      price_per_mile: null,
      work_status: { title: 'Working now', value: 1 },
      photo: null,
      domicile: null,
    },
  },
  mutations: {
    addDriver (state, payload) {
        state.driversList = payload;
    },
    addAvatar (state, payload) {
        state.avatar = payload;
    },
    editDriver (state, payload) {
        state.driversEdit = payload;

        if (payload.work_status === 1) {
            state.driversEdit.work_status = { title: 'Working now', value: 1 }
        }
        else if (payload.work_status === 0) {
          state.driversEdit.work_status = { title: 'No longer working', value: 0 }
        }
    },
    removeDriver (state, payload) {
        const list = state.driversList;
        state.driversList.splice(0, state.driversList.length);
    }
  },
  actions: {
    addDriverAction ({commit}, payload) {
        commit('addDriver', payload)
    },
    addAvatarAction ({commit}, payload) {
        commit('addAvatar', payload)
    },
    editDriverAction ({commit}, payload) {
        commit('editDriver', payload)
    },
    // updateDriverAction ({commit}, payload) {
    //     commit('updateDriver', payload)
    // },
    removeDriverAction ({commit}, payload) {
        commit('removeDriver', payload)
    }
  },
}
