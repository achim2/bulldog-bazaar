export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage({ message = [], type = '' }) {
      store.commit('showMessage', { message, type })
    }
  })
}
