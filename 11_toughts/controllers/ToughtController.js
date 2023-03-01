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
