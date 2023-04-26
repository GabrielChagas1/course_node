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

