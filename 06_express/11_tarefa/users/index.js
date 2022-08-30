const express = require('express')
const router = express.Router()

const path = require('path')
const basePath = path.join(__dirname, '../templates')

router.get('/list', (req, res) => {
    res.sendFile(`${basePath}/list.html`)
})

module.exports = router