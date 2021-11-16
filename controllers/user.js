const { request, response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validate } = require('../models/user');

const userGet = (req = request, res = response) => {
    res.json({
        msg: 'get API'
    })
}
const userPost = async (req = request, res = response) => {
    
    const {email, password, role} = req.body
    const user = new User({email, password, role})

    const alreadyExist = await User.findOne({email})
    if(alreadyExist){
        return res.status(400).json({
            error: 'The email already exists'
        })
    }

    // Encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    res.json({
        msg: 'post API',
        user
    })
}
const userPut = (req = request, res = response) => {
    res.json({
        msg: 'put API'
    })
}
const userDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete API'
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}