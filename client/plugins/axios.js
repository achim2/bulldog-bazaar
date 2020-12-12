export default function ({ store, $axios }) {
  $axios.onRequest((config) => {
  })

  $axios.onResponse((response) => {
  })

  $axios.onError((error) => {
    const errors = error.response.data.errors;
    const msg = error.response.data.message;

    console.log('onError: ', error);
    console.log('onError response: ', error.response);

    if (errors) {
      store.$notifier.showMessage({ message: errors.map(obj => obj.msg), type: 'danger' });
    } else {
      store.$notifier.showMessage({ message: [msg], type: 'danger' });
    }

  })
}
