const mongoose = require('mongoose')

async function main(){
    await mongoose.connect('mongodb://0.0.0.0:27017/getapet')
    console.log('Conectado ao banco de dados!')
}

main().catch((err) => console.log(err))

module.exports = mongoose