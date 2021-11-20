const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateJWT = async(req = request, res = response, next) =>{
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).json({
            msg: 'The token is missing.'
        })
    }

    try{
        const { _id } = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findById(_id)

        if(!user){
            res.status(401).json({
                msg: 'The token is not valid.'
            })
        }

        req.user = user

        next()
    }catch(error){
        res.status(401).json({
            msg: 'The token is not valid.'
        })
    }
}

module.exports = {
    validateJWT
}