const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {

    const user = {
        name: "Gabriel",
        surname: "Chagas",
        age: '30'
    }

    const auth = false

    const approved = false

    res.render('home', {user, auth, approved})
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'Javascript',
        body: 'Este artigo vai te ajudar a aprender node.js...',
        comments: 4
    }
    res.render('blogpost', {post})
})

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: 'Aprender Node.js',
            category: 'Javascript',
            body: 'Este artigo vai te ajudar a aprender node.js...',
            comments: 4
        },
        {
            title: 'Aprender Banco de dados',
            category: 'Banco de dados',
            body: 'Este artigo vai te ajudar a aprender banco de dados...',
        comments: 4
        }
    ]
    res.render('blog', {posts})
})

app.get('/dashboard', (req, res) => {

    const items = ["JS", "Node", "HTML", "CSS"]
    res.render('dashboard', {items})
})

app.listen(3000, () => console.log(`Projeto rodando na porta 3000`))