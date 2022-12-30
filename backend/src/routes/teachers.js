const { save } = require('../controllers/teachers')
const { validateToken } = require('../middlewares/validateToken')
const router = require('express').Router()

router.post('/', validateToken, save)

module.exports = { router }