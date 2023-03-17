const express = require('express')
const router = express.Router()

const ProductControlller = require('../controllers/ProductController')

router.get('/', ProductControlller.showProducts)
router.get('/create', ProductControlller.createProduct)
router.post('/create', ProductControlller.createProductPost)


module.exports = router