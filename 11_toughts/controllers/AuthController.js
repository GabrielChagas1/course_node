const User = require('../models/User')

const bcrypt = require('bcryptjs')

    static login(req, res){
        res.render('auth/login')
    }
