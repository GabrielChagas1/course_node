const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

// helper
const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtSave)
router.post('/edit/', checkAuth, ToughtController.updateToughtSave)
router.post('/remove', checkAuth, ToughtController.removeTought)
