const { send } = require('micro')
const microCors = require('micro-cors')
const { crawler } =  require('./crawler')
const { validUrl } = require('./utils')

const cors = microCors()

const app = async (request, response) => {
  try {
    const { url } = request.query
    const isValid = validUrl(url)
    if(!isValid) throw Error()
    const result = await crawler(url)
    send(response, 200, result)
  } catch {
    send(response, 400)
  }
}
module.exports = cors(app)