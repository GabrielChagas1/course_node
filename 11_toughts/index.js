const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

// Models
const Tought = require('./models/Tought')
const User = require('./models/User')

// Import Routes
const toughtsRoutes = require('./routes/toughtsRoutes')
const authRoutes = require('./routes/authRoutes')

// Import Controller
const ToughtController = require('./controllers/ToughtController')


// template engine
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

//session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

// flash messages
app.use(flash());

app.use(express.static("public"));

// set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});


// Routes
app.use('/toughts', toughtsRoutes)
app.use('/', authRoutes)

// Page initial
app.get('/', ToughtController.showToughts)


// banco de dados
const conn = require('./db/conn')

conn.sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(`Erro ao conectar ${err}`))