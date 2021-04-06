const ADMIN_PERMISSION = require('../config/env.config').ADMIN

// Méthode minimumPermissionLevelRequired
//
// Prend pour argument un niveau de permission et permet d'empêcher tout utilisateur avec un niveau de permission inférieur
// d'accéder à la ressource/méthode demandée (renvoie une erreur 403 dans ce cas).
//
exports.minimumPermissionLevelRequired = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.permissionLevel)
        if (user_permission_level & required_permission_level) {
            // Vu que nos autorisations sont basées sur un système de puissance de deux, autorise la requête s'il y a un bit
            // commun entre le niveau d'autorisations demandées et celui de l'utilisateur
            return next()
        } else {
            return res.status(403).send()
        }
    };
};

// Méthode onlySameUserOrAdminCanDoThisAction
//
// Permet d'empêcher tout utilisateur non administrateur ou différent de l'utilisateur concerné par la requête d'avoir accès
// à celle-ci (renvoie une erreur 403 dans ce cas).
//
exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
    let user_permission_level = parseInt(req.jwt.permissionLevel)
    let userId = req.jwt.userId

    // Vérifie si l'utilisateur est le même que celui concerné par la requête
    if (req.params && req.params.userId && userId === req.params.userId) {
        return next()
    } else {
        // Vérifie si l'utilisateur est un administrateur
        if (user_permission_level & ADMIN_PERMISSION) {
            return next()
        } else {
            return res.status(403).send()
        }
    }
};

// Méthode sameUserCantDoThisAction
// 
// Permet d'empêcher certains utilisateur de faire certaines requêtes sur eux-mêmes (renvoie une erreur 403 dans ce cas).
//
exports.sameUserCantDoThisAction = (req, res, next) => {
    let userId = req.jwt.userId

    // Vérifie si l'utilisateur est différent de celui concerné par la requête
    if (req.params.userId !== userId) {
        return next()
    } else {
        return res.status(400).send()
    }
}