const Tought = require('../models/Tought')
const User = require('../models/User')

const {Op} = require('sequelize')

module.exports = class ToughtController {
    static async showToughts(req, res){

        let search = ''

        if(req.query.search) search = req.query.search

        let order = 'DESC'

        req.query.order === 'old' ? order = 'ASC' : order = 'DESC'

        const toughtsData = await Tought.findAll({
            include: User, 
            where: {
                title:{[Op.like]: `%${search}%`}
            },
            order: [['createdAt', order]]
        })

        const toughts = toughtsData.map((result) => result.get({plain: true}))

        let toughtsQty = toughts.length

        if(toughtsQty === 0) toughtsQty = false

        res.render('toughts/home', {toughts, search, toughtsQty})
    }

    static async dashboard(req, res){
        const userId = req.session.userid;

        const user = await User.findOne({
            where:{
                id: userId
            },
            include: Tought,
            plain: true
        })

        // check if
        if(!user) res.redirect('/login')

        const toughts = user.Toughts.map((result) => result.dataValues)

        let emptyToughts = false

        if(toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtSave(req, res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid
        }

        if(tought.title === ''){
            req.flash('Message', 'Por favor, digite algo no campo')
            return
        }


        try {
            await Tought.create(tought)
    
            req.flash('message', 'Pensamento criado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(`Erro na hora de criar um pensamento: ${error}`)
        }
    }

    static async removeTought(req, res){
        const id = req.body.id
        const UserId = req.session.userid
        
        try {
            await Tought.destroy({where:{id: id, UserId: UserId}})
            req.flash('message', 'Pensamento excluído com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })            
        } catch (error) {
            console.log(`Erro na hora de remover o pensamento ${error}`)
        }

    }
