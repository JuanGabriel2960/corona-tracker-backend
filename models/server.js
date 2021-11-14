const express = require('express')
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()
        this.basicPathGroup = '/api/basic'
        this.userPathGroup = '/api/users'

        // Middlewares
        this.middlewares()

        // Routes
        this.routes()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.basicPathGroup, require('../routes/basic'))
        this.app.use(this.userPathGroup, require('../routes/user'))
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server running on PORT: ${process.env.PORT}`)
        })
    }
}

module.exports = Server;