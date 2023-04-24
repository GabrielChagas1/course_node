const express = require('express')
const cors = require('cors')

const app = express()

// config json response
app.use(express.json())

// solve cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.use(express.static('public'))
