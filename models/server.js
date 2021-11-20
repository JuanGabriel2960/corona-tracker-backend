const express = require('express')
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server{
    constructor(){
        this.app = express()
        this.basicPathGroup = '/api/basic'
        this.authPathGroup = '/api/auth'
        this.userPathGroup = '/api/user'

        // Connect to database
        this.connectDB()

        // Middlewares
        this.middlewares()

        // Routes
        this.routes()
    }

    async connectDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.basicPathGroup, require('../routes/basic'))
        this.app.use(this.authPathGroup, require('../routes/auth'))
        this.app.use(this.userPathGroup, require('../routes/user'))
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Server running on PORT: ${process.env.PORT}`)
        })
    }
}

module.exports = Server;