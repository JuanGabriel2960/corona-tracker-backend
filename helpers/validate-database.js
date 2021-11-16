const Role = require('../models/role')
const User = require('../models/user')

const validateRole = async(role = '') => {
    const roleExist = await Role.findOne({role})
    if(!roleExist){
        throw new Error(`Role ${role} is not valid`)
    }
}

const validateEmail = async(email = '') => {
    const emailExist = await User.findOne({email})
    if(emailExist){
        throw new Error('The email already exists')
    }
}

module.exports = {
    validateRole,
    validateEmail
}