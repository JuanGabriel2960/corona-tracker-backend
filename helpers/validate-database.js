const Role = require('../models/role')

const validateRole = async(role = '') => {
    const roleExist = await Role.findOne({role})
    if(!roleExist){
        throw new Error(`Role ${role} is not valid`)
    }
}

module.exports = {
    validateRole
}