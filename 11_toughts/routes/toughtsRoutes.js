const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

// helper
const checkAuth = require('../helpers/auth').checkAuth
