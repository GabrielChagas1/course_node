const express = require('express')
const router = express.Router()

const ProductControlller = require('../controllers/ProductController')

router.get('/', ProductControlller.showProducts)
router.get('/create', ProductControlller.createProduct)
router.post('/create', ProductControlller.createProductPost)
router.get('/:id', ProductControlller.getProduct)
router.post('/remove/:id', ProductControlller.removeProduct)
router.get('/edit/:id', ProductControlller.editProduct)




module.exports = router