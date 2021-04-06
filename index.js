const config = require('./common/config/env.config.js')

const express = require('express')
const app = express()

const UsersRouter = require('./users/routes.config')
const TokenRouter = require('./tokens/routes.config')
const JustifyRouter = require('./justify/routes.config')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    res.header('Access-Control-Expose-Headers', 'Content-Length')
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200)
    } else {
        return next();
    }
})

app.use('/api/users', express.json())
app.use('/api/token', express.json())
app.use('/api/justify', express.text())
UsersRouter.routesConfig(app)
TokenRouter.routesConfig(app)
JustifyRouter.routesConfig(app)

const port = process.env.PORT || config.port;

app.listen(port, () => {
    console.log('Serveur à l\'écoute, port : %s', port)
})