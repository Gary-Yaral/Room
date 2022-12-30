const { hasAuthorization} = require('../utils/functions/validateAuth')
const {verifyValidToken } = require('../helpers/handleToken')

/**
 * This function verifies that token is valid
 * @param {Object} req Object that contains the data that was sended to API
 * @param {Object} res Function that allows to send a response 
 * @param {Function} next Executes the next middleware on the end point
 * @returns void
 */
const validateToken = (req, res, next) => {
  let auth = hasAuthorization(req)
  if (!auth.isValid) {
    res.status(409).send({ error: 'Access denied' })
    return
  }

  try{
    if(verifyValidToken(auth.token)) {
      next()
    }
  } catch (err) {
    res.status(409).send({ 
      error: 'Access denied',
      type: 'invalid token'
    })
  }
}

module.exports = { validateToken }