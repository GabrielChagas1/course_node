const express = require('express')
const exphbs = require('express-handlebars')

const app = express();
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static('public'))

var products = [
    {
        id: 1,
        title: 'Product 1',
        name: 'Product 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis dui et tortor finibus, sed feugiat ex pharetra. Sed elementum suscipit viverra. Quisque vel lectus nunc.'
    },
    {
        id: 2,
        title: 'Product 2',
        name: 'Product 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis dui et tortor finibus, sed feugiat ex pharetra. Sed elementum suscipit viverra. Quisque vel lectus nunc.'
    },
    {
        id: 3,
        title: 'Product 3',
        name: 'Product 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mollis dui et tortor finibus, sed feugiat ex pharetra. Sed elementum suscipit viverra. Quisque vel lectus nunc.'
    },
]

app.get('/', (req, res) => {
    res.render('home', {products})
})

app.get('/product/:id', (req, res) => {
    let id = Number(req.params.id)
    let product = products.find((product) => {return product.id === id})
    res.render('product', {product})
})

app.listen(3000, () => console.log(`Projeto Rodando na porta 3000`))