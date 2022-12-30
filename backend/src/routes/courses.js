const { save, getAll, update, deleteRow } = require('../controllers/courses')
const { validateToken } = require('../middlewares/validateToken')
const router = require('express').Router()

router.post('/', validateToken, save)
router.post('/all', validateToken, getAll)
router.put('/', validateToken, update)
router.delete('/', validateToken, deleteRow)

module.exports = { router }