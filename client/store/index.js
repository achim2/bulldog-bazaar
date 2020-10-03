export const state = () => ({
  alert: {
    message: '',
    type: '',
  }
})

// export const getters = {
// }

export const mutations = {
  showMessage (state, payload) {
    state.alert.message = payload.message
    state.alert.type = payload.type
  }
}

// export const actions = {
// }

