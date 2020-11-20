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
  })
}
