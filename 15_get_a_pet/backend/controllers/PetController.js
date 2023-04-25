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

    static async getAllUserPets(req, res) {
        // get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({
            'user._id': user._id
        }).sort('-createdAt')

        res.status(200).json({
            pets
        })
    }

    static async getAllUserAdoptions(req, res) {
        // get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        console.log(user)

        const pets = await Pet.find({
            'adopter._id': user._id
        }).sort('-createdAt')

        res.status(200).json({
            pets
        })
    }

    static async getPetById(req, res) {
        const id = req.params.id

        if (!ObjectId.isValid(id)) return res.status(422).json({
            message: 'ID Inválido!'
        })

        const pet = await Pet.findOne({
            _id: id
        })

        if (!pet) return res.status(404).json({
            message: 'Pet não encontrado'
        })


        res.status(200).json({
            pet: pet
        })

    }

    static async removePetById(req, res) {
        const id = req.params.id

        // check if id is valid
        if (!ObjectId.isValid(id)) return res.status(422).json({
            message: 'ID Inválido!'
        })

        // check if pet exists
        const pet = await Pet.findOne({
            _id: id
        })
        if (!pet) return res.status(404).json({
            message: 'Pet não encontrado'
        })

        // check if logged un user  registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) return res.status(404).json({
            message: 'Houve um problema em processar a sua solicitação!'
        })

        await Pet.findByIdAndRemove(id)

        res.status(200).json({
            message: 'Pet Removido com sucesso!'
        })

    }

    static async updatePetById(req, res) {
        const id = req.params.id

        const {
            name,
            age,
            weight,
            color,
            available
        } = req.body

        const images = req.files

        const updateData = {}

        // check if pet exists
        const pet = await Pet.findOne({
            _id: id
        })
        if (!pet) return res.status(404).json({
            message: 'Pet não encontrado'
        })

        // check if logged un user  registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) return res.status(404).json({
            message: 'Houve um problema em processar a sua solicitação!'
        })

        // validations
        if (!name) {
            res.status(422).json({
                message: 'O nome é obrigatório!'
            })
            return
        } else {
            updateData.name = name
        }

        if (!age) {
            res.status(422).json({
                message: 'A idade é obrigatória!'
            })
            return
        } else {
            updateData.age = age
        }

        if (!weight) {
            res.status(422).json({
                message: 'O peso é obrigatório!'
            })
            return
        } else {
            updateData.weight = weight
        }

        if (!color) {
            res.status(422).json({
                message: 'A cor é obrigatória!'
            })
            return
        } else {
            updateData.color = color
        }

        //console.log(images)

        if (images.length > 0) {
            // res.status(422).json({
            //     message: 'A imagem é obrigatória!'
            // })
            // return
            updateData.images = []
            images.map((image) => {
                updateData.images.push(image.filename)
            })
        } 
        // else {}

        if (!available) {
            res.status(422).json({
                message: 'O status é obrigatório!'
            })
            return
        } else {
            updateData.available = available
        }

        //updateData.description = description

        await Pet.findByIdAndUpdate(id, updateData)

        res.status(200).json({
            pet: pet,
            message: 'Pet atualizado com sucesso!'
        })


    }
