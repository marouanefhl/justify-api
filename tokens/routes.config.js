const VerifyUserMiddleware = require('./middlewares/verify.user.middleware')
const ValidationMiddleware = require('../common/middlewares/validation.middleware');
const TokenController = require('./controllers/tokens.controller')

// Configuration de la route correspondant à l'endpoint "api/token" gérant l'authentification des utilisateurs
exports.routesConfig = function(app) {

    // Requête POST permettant d'obtenir un token d'authentification JWT nécessaire à beaucoup d'opérations dans l'API, ainsi qu'un token de rafraîchissement du JWT
    // Middlewares utilisés : Vérification des champs envoyés pour la génération du token (pour le moment seul l'email est utilisé, possibilité de rajouter un mdp),
    //                        vérification de la validité de l'utilisateur
    app.post('/api/token', [
        VerifyUserMiddleware.hasValidFieldsForToken,
        VerifyUserMiddleware.isUserValid,
        TokenController.login
    ])

    // Requête POST permettant d'obtenir un nouveau JWT à partir du JWT expiré et du token de rafraîchissement
    // Middlewares utilisés : Vérification de la validité du JWT, vérification de la présence et de la validité du token de rafraîchissement
    app.post('/api/token/refresh', [
        ValidationMiddleware.validJWTNeeded,
        ValidationMiddleware.verifyRefreshBodyField,
        ValidationMiddleware.validRefreshNeeded,
        TokenController.refresh_token
    ]);
}