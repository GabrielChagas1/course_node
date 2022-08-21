const express = require('express')
const app = express()
const port = 3333

const path = require('path')

const basePath = path.join(__dirname, 'templates')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.get('/users/save', (req, res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req, res) => {
    let name = req.body.name
    let age = req.body.age
    console.log(`O nome do usuário é ${name} e ele tem ${age} anos`)
})


app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})
