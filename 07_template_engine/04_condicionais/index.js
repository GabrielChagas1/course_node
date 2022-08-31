const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {

    const user = {
        name: "Gabriel",
        surname: "Chagas",
        age: '30'
    }

    const auth = false

    res.render('home', {user, auth})
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

app.listen(3000, () => console.log(`Projeto rodando na porta 3000`))