const User = require('../models/user');
const bcryptjs = require('bcryptjs')
const { request, response } = require('express');

const userGet = (req = request, res = response) => {
    res.json({
        msg: 'get user API'
    })
}
const userPut = async(req = request, res = response) => {
    const { id } = req.params
    const { email, password, _id, ...rest } = req.body

    // NOTE: validate in database
    if(password){
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }
 
    const user = await User.findByIdAndUpdate(id, rest)

    res.json({
        msg: 'Updated data',
        user
    })
}
const userDelete = async(req = request, res = response) => {
    const {email, password} = req.body   
    const authenticatedUser = req.user

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                msg: 'Wrong credentials.'
            })
        }

        const checkPassword = bcryptjs.compareSync(password, user.password)
        if(!checkPassword){
            return res.status(401).json({
                msg: 'Wrong credentials.'
            })
        }

        if(authenticatedUser.id !== user.id){
            return res.status(401).json({
                msg: 'Wrong credentials.'
            })
        }

        const deletedUser = await User.findByIdAndDelete(user.id)

        res.json({
            msg: 'Deleted user',
            deletedUser
        })
    }catch(error){
        return res.status(500).json({
            msg: 'Internal Server Error.'
        })
    }
}

module.exports = {
    userGet,
    userPut,
    userDelete
}