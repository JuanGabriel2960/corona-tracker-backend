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
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    
    res.json({
        msg: 'Deleted user',
        id
    })
}

module.exports = {
    userGet,
    userPut,
    userDelete
}