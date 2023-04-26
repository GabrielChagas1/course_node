const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token.js')
const schema = require('../helpers/validation-user')

module.exports = class UserController {
    static async register(req, res) {
        const {
            name,
            email,
            phone,
            password,
            confirmpassword
        } = req.body

        try {
            await schema.validate(req.body)
        } catch (err) {
            return res.status(400).json({message: err.errors})
        }

         // create a password
         const salt = await bcrypt.genSalt(12)
         const passwordHash = await bcrypt.hash(password, salt)

         //create a user
         const user = new User({
             name,
             email,
             phone,
             password: passwordHash
         })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (err) {
            res.status(500).json({
                message: err
            })
        }

    }

    static async login(req, res) {
        const {
            email,
            password
        } = req.body

        if (!email) {
            res.status(422).json({
                message: 'O email é obrigatório'
            })
            return
        }
        if (!password) {
            res.status(422).json({
                message: 'A senha é obrigatória'
            })
            return
        }

        // check if user exists
        const user = await User.findOne({
            email: email
        })
        if (!user) {
            res.status(422).json({
                message: 'Não existe esse usuário com este email'
            })
            return
        }

        // check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({
                message: 'Senha Inválida'
            })
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'nossosecret')

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = req.params.id
        const user = await User.findById(id).select("-password")

        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }

        res.status(200).json(user)

    }

    static async editUser(req, res) {
        const {
            name,
            email,
            phone,
            password,
            confirmpassword
        } = req.body
        const id = req.params.id

        // check if user exists
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (!user) return res.status(422).json({
            message: 'Usuário não encontrado!'
        })


        if(req.file){
            user.image = req.file.filename
        }

        // validations
        if (!name) return res.status(422).json({
            message: 'O nome é obrigatório'
        })
        user.name = name

        if (!email) return res.status(422).json({
            message: 'O email é obrigatório'
        })

        // check if email has already
        const userExists = await User.findOne({
            email: email
        })
        if (user.email !== email && userExists) return res.status(422).json({
            message: 'Esse email já existe'
        })
        user.email = email

        if (!phone) return res.status(422).json({
            message: 'O phone é obrigatório'
        })
        user.phone = phone


        if (password !== confirmpassword) {
            return res.status(402).json({
                message: 'A senha e a confirmação precisam ser iguais!'
            })
        } else if (password === confirmpassword && password != null) {
            // create a password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        try {
            await User.findOneAndUpdate({
                _id: user._id
            }, {
                $set: user
            }, {
                new: true
            })
            res.status(200).json({
                message: "Usuário atualizado com sucesso!"
            })
        } catch (err) {
            return res.status(500).json({
                message: err
            })
        }


    }

}