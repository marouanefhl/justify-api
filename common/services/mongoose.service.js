const mongoose = require('mongoose')
let count = 0

const options = {
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectWithRetry = () => {
    console.log('Connexion à la BD MongoDB')
    mongoose.connect("mongodb+srv://marouanef:RftMhvbqwpSytlSD@cluster0.kpt84.mongodb.net/justify-api-db?retryWrites=true&w=majority", 
    options).then(() => {
        console.log('Connexion à la BD réussie')
    }).catch(err => {
        console.log('Connection à la DB échouée, retry %s dans 5s...', ++count)
        setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

exports.mongoose = mongoose