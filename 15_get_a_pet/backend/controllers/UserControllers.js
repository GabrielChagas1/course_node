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
