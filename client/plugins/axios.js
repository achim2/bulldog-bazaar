export default function ({ $axios, store, redirect }) {
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
    console.log('onError: ', error);
    console.log('onError response: ', error.response);

    //if jwt token expired or authorization error occurred then BE throw 401 status code && url not login then reload login
    if (error.response.status === 401 && error.response.config.url !== '/login') {
      redirect({ name: 'login' })
    }

    store._vm.$nextTick(() => {
      if (store._vm.$nuxt != null) {
        store._vm.$nuxt.$loading.finish();
        return Promise.reject(error);
      }
    })
  })
}
