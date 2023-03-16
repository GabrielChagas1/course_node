const mongoose = require('mongoose')

require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.caffnav.mongodb.net/test`

//const client = new MongoClient(uri)

async function run(){
    try {
        await mongoose.connect(uri)
        console.log('Conectando ao MongoDB!')
    } catch (err) {
        console.log(err)
    }
}

module.exports = run()