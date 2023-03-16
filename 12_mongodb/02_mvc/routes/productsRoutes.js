const express = require('express')
const router = express.Router()

const ProductControlller = require('../controllers/ProductController')

router.get('/', ProductControlller.showProducts)

module.exports = router