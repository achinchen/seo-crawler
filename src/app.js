const { crawler } =  require('./crawler')
const { validUrl } = require('./utils')

async function app(request, response) {
  try {
    const { url } = request.query
    const isValid = validUrl(url)
    if(!isValid) throw Error()
    const result = await crawler(url)
    response.status(200).send(result)
  } catch(error) {
    console.log(error)
    response.status(500).send('oops')
  }
}

module.exports = app