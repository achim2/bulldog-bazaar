export default function ({ store, $axios }) {
  $axios.onRequest((config) => {
    store._vm.$nextTick(() => {
      if (store._vm.$nuxt != null) {
        store._vm.$nuxt.$loading.start();
        return config;
      }
    })
  })

  $axios.onResponse((response) => {
    store._vm.$nextTick(() => {
      if (store._vm.$nuxt != null) {
        store._vm.$nuxt.$loading.finish();
        return response;
      }
    })
  })

  $axios.onError((error) => {
    store._vm.$nextTick(() => {
      if (store._vm.$nuxt != null) {
        store._vm.$nuxt.$loading.finish();
        return Promise.reject(error);
      }
    })
  })
}
