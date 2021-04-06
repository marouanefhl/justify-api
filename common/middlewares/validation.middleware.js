const jwt = require('jsonwebtoken'),
    secret = require('../config/env.config.js').jwt_secret,
    crypto = require('crypto')

// Méthode verifyRefreshBodyField
// 
// Vérifie si le token de rafrachissement du JWT existe bien dans le corps de la requête.
// 
exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next()
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'})
    }
}

// Méthode validRefreshNeeded
// 
// Permet de vérifier la validité du token de rafraichissement du JWT.
// 
exports.validRefreshNeeded = (req, res, next) => {
    let b = Buffer.from(req.body.refresh_token, 'base64')
    let refresh_token = b.toString()
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64")
    if (hash === refresh_token) {
        req.body = req.jwt
        return next()
    } else {
        return res.status(400).send({error: 'Invalid refresh token'})
    }
};

// Méthode validJWTNeeded
// 
// Permet de vérifier la validité du token JWT entré dans le champ d'authentification de la requête.
// 
exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ')
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send()
            } else {
                req.jwt = jwt.verify(authorization[1], secret)
                return next()
            }

        } catch (err) {
            return res.status(403).send()
        }
    } else {
        return res.status(401).send()
    }
};