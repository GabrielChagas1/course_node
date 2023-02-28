const User = require('../models/User')

const bcrypt = require('bcryptjs')

    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const {email, password} = req.body
        // find user
        const user = await User.findOne({where: {email: email}})

        if(!user){
            req.flash('message', 'Usuário não encontrado')
            res.render('auth/login')
            return
        }

        // check if passwords match
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch){
            req.flash('message', 'Usuário não encontrado')
            res.render('auth/login')
            return
        }

        // initialize session
        req.session.userid = user.id
        req.flash('message', 'Autenticação realizada com sucesso!')
        req.session.save(() => {
            res.redirect('/')
        })
    }
