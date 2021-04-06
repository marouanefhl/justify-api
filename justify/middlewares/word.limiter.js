const redisPort = require('../../common/config/env.config').redisPort
const wordLimit = require('../../common/config/env.config').wordLimit
const limiterPeriod = require('../../common/config/env.config').limiterPeriod

const redis = require('redis')
const fs = require("fs");

const redisClient = redis.createClient(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
});
const moment = require('moment')

// Méthode perWordLimit
// 
// Middleware permettant de limiter le nombre de mots envoyés pour la justification pendant une période donnée (les deux
// paramètres étant spécifiés dans "justify-api/common/config/env.config.js")
// Cette méthode utilise un serveur Redis pour stocker les ID d'utilisateurs ainsi que la date de début puis le nombre de 
// mots envoyés dans la période
// 
exports.perWordLimit = (req, res, next) => {
    console.log("Rate limiting : justify")

    let userId = req.jwt.userId
    var str = req.body.replace(/(^\s*)|(\s*$)/gi,"") // En utilisant des expressions régulières, on isole les mots afin de pouvoir les compter
    str = str.replace(/[ ]{2,}/gi," ")
    str = str.replace(/\n /,"\n")
    var wordCount = str.split(' ').length

    if(wordCount > wordLimit) {
        console.log("Rate limiting : fail")
        return res.status(402).send() // Renvoie une erreur 402 si la requête contient un nombre de mots dépassant la limite
    }

    redisClient.exists(userId, (err, reply) => {
        if(err) {
            console.log("Redis ne marche pas. Le programme va être fermé...")
            system.exit(0)
        }

        if(reply === 1) { // Cas où l'utilisateur existe dans la BD
            redisClient.get(userId, (err, reply) => {
                let data = JSON.parse(reply)
                let currentTime = moment().unix()
                let difference = (currentTime - data.startTime) / limiterPeriod
                if(difference >= 1) { // Différence de temps supérieure à la période limitante
                    let body = { // Réinitialisation de l'entrée dans la BD
                        'count': wordCount, 
                        'startTime': moment().unix()
                    }
                    redisClient.set(userId, JSON.stringify(body))
                    console.log("Rate limiting : pass")
                    next()
                }
                if(difference < 1) { // Utilisateur toujours dans la même période limitante
                    if(data.count + wordCount > wordLimit) { // Nombre de mots de la requête + nombre de mots déjà traités est supérieur à la limite
                        console.log("Rate limiting : fail")
                        return res.status(402).send()
                    }
                    data.count += wordCount
                    redisClient.set(userId, JSON.stringify(data)) // Met à jour le nombre de mots
                    console.log("Rate limiting : pass")
                    next()
                }
            })
        } else { 
            let body = { // Crée une nouvelle entrée dans la BD
                'count': wordCount,
                'startTime': moment().unix()
            }
            redisClient.set(userId, JSON.stringify(body))
            console.log("Rate limiting : pass")
            next()
        }
    })

}