const Role = require('../models/role')
const User = require('../models/user')

const validateRole = async(role = '') => {
    const roleExist = await Role.findOne({role})
    if(!roleExist){
        throw new Error(`The role ${role} is not valid`)
    }
}

const validateEmail = async(email = '') => {
    const emailExist = await User.findOne({email})
    if(emailExist){
        throw new Error('The email already exists')
    }
}

const validateID = async(id) => {
    const idExist = await User.findById(id)
    if(!idExist){
        throw new Error('The ID is not valid.')
    }
}

module.exports = {
    validateRole,
    validateEmail,
    validateID
}