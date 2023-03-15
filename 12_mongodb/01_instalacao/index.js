const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

// template engine
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.listen(3000)