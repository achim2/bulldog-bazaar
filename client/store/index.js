export const strict = false
export const state = () => ({
  user: {
    isAuthenticated: false
  }
})

export const getters = {
  isAuthenticated: state => {
    return state.user.isAuthenticated;
  }
}
