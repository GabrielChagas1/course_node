const {Sequelize} = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize('nodemvc2', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Conectamos ao MySQL!')
} catch (error) {
    console.log(`Não foi possível conectar: ${error}`)
}

module.exports = sequelize