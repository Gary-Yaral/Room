/**
 * Verifies if token was sended in the request header inside of property named 'Authorization'
 * @param {Object} req Contains all data of request that was sended
 * @returns {Object} Contains the result of the verification of request header
 */
const hasAuthorization = (req) => {
  let headers = Object.keys(req.headers)
  headers = headers.map(key => key.toLowerCase())
  const authExists = headers.includes('authorization')
  if(!authExists) return { isValid:false, token: undefined }
  const auth = req.headers['Authorization'] || req.headers['authorization']
  let token = auth.split(' ')[1]
  if (!token) return { isValid:false, token: undefined }
  return { isValid:true, token }
}

module.exports = { hasAuthorization }