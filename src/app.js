const { crawler } =  require('./crawler')
const { validUrl } = require('./utils')

async function app(request, response) {
  try {
    const { url } = request.query
    console.log('HIT!')
    // const isValid = validUrl(url)
    // if(!isValid) throw Error()
    // const result = await crawler(url)
    send(response)
    response.status(200).send({ url })
  } catch {
    response.status(500).send('oops')
  }
}

module.exports = app