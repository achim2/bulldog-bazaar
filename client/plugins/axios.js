export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    // console.log('onRequest: ', config)
    // console.log('Making request to: ' + config.url)
  })

  //errors from mongo, if validation not exists
  //errors from server
  //errors from validation
  //errors from throw
  $axios.onError(error => {
    console.log('onError: ', error)
    console.log('onError response: ', error.response)

    //if jwt token expired or authorization error occurred then BE throw 401 status code && url not login then reload login
    if (error.response.status === 401 && error.response.config.url !== '/login') {
      redirect({ name: 'login' })
    }

    if (error.response.status === 404) {
      redirect({ name: '404' })
    }
  })
}
