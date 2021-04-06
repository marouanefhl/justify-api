const UserModel = require('../../users/models/users.model')

exports.hasValidFieldsForToken = (req, res, next) => {
    let errors = []

    if(req.body) {
        if(!req.body.email) {
            errors.push('Missing email field')
        }

        if(errors.length) {
            return res.status(400).send({errors: errors.join(',')})
        } else {
            return next();
        }

    } else {
        return res.status(400).send({errors: 'Missing authentication data'})
    }
}

exports.isUserValid = (req, res, next) => {
    UserModel.findByEmail(req.body.email).then((user) => {
        if(!user[0]) {
            res.status(404).send({errors: ['Email not found']})
        } else {
            req.body = {
                userId: user[0].id,
                email: user[0].email,
                permissionLevel: user[0].permissionLevel
            }
            return next()
        }
    })
}