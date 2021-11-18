const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { request, response } = require('express');

const login = async(req = request, res = response) => {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                error: 'Incorrect email or password.'
            })
        }

        const checkPassword = bcryptjs.compareSync(password, user.password)
        if(!checkPassword){
            return res.status(401).json({
                error: 'Incorrect email or password.'
            })
        }

        res.json({
            msg: 'post Login'
        })
    }catch(error){
        return res.status(500).json({
            error: 'Internal Server Error.'
        })
    }
}

const register = (req = request, res = response) => {
    res.json({
        msg: 'post Register'
    })
}

module.exports = {
    login,
    register
}