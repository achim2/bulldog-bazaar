export default function (req, res, next) {
  console.log('middleware logger, node logger')
  // console.log(req)
  // console.log(res)
  next()
}
