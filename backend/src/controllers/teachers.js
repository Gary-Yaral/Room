const { codifyPass, verifyPass, SALT } = require('../helpers/handlePassword');
const { createToken } = require('../helpers/handleToken');
const { connection } = require('../sql/connection')


const save = (req, res) => {
  return res.status(200).json({
    message: `Docente creado`,
    status: true
  })
}

module.exports = { save }