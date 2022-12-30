const { codifyPass, verifyPass, SALT } = require('../helpers/handlePassword');
const { createToken } = require('../helpers/handleToken');
const { connection } = require('../sql/connection')

/**
 * This function processes the request that was sended to API and sends the carrusels data 
 * @param {Object} req Request that was sended to API
 * @param {Object} res Response that the API will send
 * @returns void
 */
const login = (req, res) => {
  let { user, password } = req.body
  let query = `SELECT * FROM teacher WHERE dni = ${user}`
  
  return connection.query(query, (error, results, fields) => {
    if (error) throw error;
    if(results.length === 0) {
      return res.status(403).json({
        error: `Usuario ${user} no existe`,
        status: false
      })
    };

    if (verifyPass(password, results[0].password)) {
      let { dni, name, lastname } = results[0]
      const data = {dni, name, lastname}
      let token = createToken(data)
      return res.status(200).json({
        teacher: data,
        token,
        status: true
      })
    }

    return res.status(403).json({
      error: `Contraseña incorrecta`,
      status: false
    })

  })
}

module.exports = { login }