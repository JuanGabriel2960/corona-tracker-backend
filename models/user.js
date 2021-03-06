const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    email:{
        type: String,
        require: [true, 'Email is required'],
        unique: true
    },
    password:{
        type: String,
        require: [true, 'Password is required'],
    },
    role:{
        type: String,
        require: [true, 'Role is required'],
        emun: ['MEDICAL', 'STUDENT', 'REPORTER', 'TOURIST', 'OTHER']
    }
})

UserSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject()
    return user;
}

module.exports = model('User', UserSchema)