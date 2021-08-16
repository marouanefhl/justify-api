const mongoose = require('mongoose')
const { config } = require('dotenv');

let count = 0

const options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectWithRetry = () => {
    config()
    const uri = process.env.DB_URI
    console.log('Connexion à la BD MongoDB')
    mongoose.connect(uri, 
    options).then(() => {
        console.log('Connexion à la BD réussie')
    }).catch(err => {
        console.log('Connection à la DB échouée, retry %s dans 5s...', ++count)
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

exports.mongoose = mongoose