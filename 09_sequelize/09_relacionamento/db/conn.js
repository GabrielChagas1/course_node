const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodesequelize2', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

// try {
//     sequelize.authenticate()
//     console.log('Conectado ao banco de dados')
// } catch (err) {
//     console.log(`Não foi possível conectar: ${err}`)
// }

module.exports = sequelize
