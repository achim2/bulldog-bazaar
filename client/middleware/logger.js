export default function (req, res, next) {
  console.log('middleware logger')
  console.log(req.url)
  // console.log(res)
  next()
}
