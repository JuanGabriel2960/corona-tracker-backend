const jwt = require('jsonwebtoken')

const generateJWT=(_id)=>{
    return new Promise((resolve, reject)=>{
        const payload = {_id}

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '12h'
        }, (error, token)=>{
            if(error){
                reject('Error generating JWT.')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports = {
    generateJWT
}