const JustifyController = require('./controllers/justify.controller')
const PermissionMiddleware = require('../common/middlewares/permission.middleware')
const ValidationMiddleware = require('../common/middlewares/validation.middleware')
const WordLimiter = require('./middlewares/word.limiter')
const config = require('../common/config/env.config')

const FREE = config.permissionLevels.NORMAL_USER
const PAID = config.permissionLevels.PAID_USER

// Configuration de la route correspondant à l'endpoint "api/justify" gérant la justification de textes
exports.routesConfig = function (app) {

    // Requête POST avec un body de type "text/plain", qui attend en retour le texte justifié correspondant au texte envoyé
    // Middlewares utilisés : Validation du JWT, Permissions minimales définies sur FREE, Rate Limiting sur le nombre de mots envoyés sur une période donnée
    app.post('/api/justify', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        WordLimiter.perWordLimit,
        JustifyController.justify
    ])

    // Possibilité d'ajout d'une requête de flush de la limite ou de POST sans limitations en fonction du statut de l'utilisateur
}