const Pet = require('../models/Pet')

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const schema = require('../helpers/validation-pet')
const ObjectId = require('mongoose').Types.ObjectId

    // create a pet
    static async create(req, res) {
        const {
            name,
            age,
            weight,
            color
        } = req.body

        const images = req.files

        const available = true

        // images upload

        try {
            await schema.validate(req.body)
        } catch (err) {
            return res.status(400).json({
                message: err.errors
            })
        }

        if (images.length === 0) return res.status(422).json({
            message: 'A imagem é obrigatória!'
        })

        const token = getToken(req)
        const user = await getUserByToken(token)

        // create a pet
        // create pet
        const pet = new Pet({
            name: name,
            age: age,
            //description: description,
            weight: weight,
            color: color,
            available: available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })


        try {
            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet cadastrado com sucesso!',
                newPet
            })


        } catch (err) {
            res.status(500).json({
                message: err
            })
        }



    }

    static async getAll(req, res) {
        const pets = await Pet.find().sort('-createdAt')
        res.status(200).json({
            pets: pets
        })
    }
