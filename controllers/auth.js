const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { request, response } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req = request, res = response) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                msg: 'Incorrect email or password.'
            })
        }

        const checkPassword = bcryptjs.compareSync(password, user.password)
        if(!checkPassword){
            return res.status(401).json({
                msg: 'Incorrect email or password.'
            })
        }

        const token = await generateJWT(user._id)

        res.json({
            user,
            token
        })
    }catch(error){
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

const register = async(req = request, res = response) => {
    const {email, password, role} = req.body
    const user = new User({email, password, role})

    try{
        // Encrypt password
        const salt = bcryptjs.genSaltSync()
        user.password = bcryptjs.hashSync(password, salt)

        await user.save()

        const token = await generateJWT(user._id)

        res.json({
            user,
            token
        })
    }catch(error){
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

const renewToken= async(req, res)=>{
    const authenticatedUser = req.user
    const token = await generateJWT(authenticatedUser._id)

    res.json({
        msg: 'renew token',
        token,
        authenticatedUser
    })
}

module.exports = {
    login,
    register,
    renewToken
}