const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb://0.0.0.0:27017/testedb";
// Create a new MongoClient
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB!");
  } catch (err) {
    console.log(err);
  }
}

run();

module.exports = client;