export const state = () => ({
  alert: {
    message: '',
    type: '',
  },
  info: {
    email: '',
    phone: '',
  }
})

export const getters = {
  info: state => {
    return state.info;
  },
}

export const mutations = {
  showMessage(state, payload) {
    state.alert.message = payload.message
    state.alert.type = payload.type
  },
  fetchInfo(state, payload) {
    state.info.email = payload.email;
    state.info.phone = payload.phone;
  }
}

export const actions = {
  async fetchInfo({ commit }) {
    await this.$axios.get('/info')
      .then((res) => {
        if (res.status === 200) {
          commit('fetchInfo', res.data)
        }
      })
  },
}

