const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => [
    res.render('home')
])

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodemysql2'
})

conn.connect((err) => {
    if(err) console.log(err)

    console.log('Conectado ao MySQL')
    app.listen(3000, () => console.log(`Projeto rodando na porta 3000`))
})
