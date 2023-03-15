const {MongoClient} = require('mongodb')

const mongoose = require('mongoose')

const uri = "mongodb+srv://gabrielserq:aPYM6OWYCW8lvXn6@cluster0.caffnav.mongodb.net/test"

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