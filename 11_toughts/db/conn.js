const {Sequelize} = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize('toughts', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})
