const UsersController = require('./controllers/users.controller')
const PermissionMiddleware = require('../common/middlewares/permission.middleware');
const ValidationMiddleware = require('../common/middlewares/validation.middleware');
const config = require('../common/config/env.config')

const ADMIN = config.permissionLevels.ADMIN;
const FREE = config.permissionLevels.NORMAL_USER;

// Configuration de la route correspondant à l'endpoint "api/users" gérant le système d'utilisateurs
exports.routesConfig = function (app) {

    // Requête POST permettant de créer un nouvel utilisateur (autorisations minimales)
    // Pas de restrictions au niveau de la création pour le moment
    app.post('/api/users', [
        UsersController.insert
    ])

    // Requête GET permettant d'extraire la liste des utilisateurs inscrits
    // Middlewares utilisés : Validation du JWT et autorisations minimales définies sur FREE (changerait à PAID ou ADMIN plus tard)
    app.get('/api/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UsersController.list
    ]) 

    // Requête GET permettant d'extraire les informations de l'utilisateur dont l'ID a été fourni
    // Middlewares utilisés : Validation du JWT, autorisations minimales définies sur FREE, et vérification du statut de l'utilisateur (même que dans la requête ou admin)
    app.get('/api/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ])

    // Requête PATCH permettant de modifier certaines des informations personnelles
    // Middlewares utilisés : Validation du JWT, autorisations minimales définies sur FREE, et vérification du statut de l'utilisateur (même que dans la requête ou admin)
    app.patch('/api/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.patchById
    ])

    // Requête DELETE permettant de supprimer un utilisateur
    // Middlewares utilisés : Validation du JWT, autorisations minimales définies sur FREE (normalement sur ADMIN), 
    // et vérification du statut de l'utilisateur (différent que dans la requête)
    app.delete('/api/users/:userId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.sameUserCantDoThisAction,
        UsersController.removeById
    ])
}


