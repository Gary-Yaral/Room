/**
 * Contains all domains that can access to our api
 * @type Array<URL>
 */
const whiteList = ['http://localhost:5500']

/**
 * This object contains all options to validate the cors
 * @type Object 
 */
var corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} 

const cors = require('cors')()

module.exports = { cors }