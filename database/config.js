const mongoose = require('mongoose')

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('Successful connection to the database')
    }catch(error){
        console.log(error)
        throw new Error('Error establishing connection to database')
    }
}

module.exports = {
    dbConnection
}