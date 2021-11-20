const { request, response } = require('express');

const userGet = (req = request, res = response) => {
    res.json({
        msg: 'get user API'
    })
}
const userPut = (req = request, res = response) => {
    res.json({
        msg: 'put user API'
    })
}
const userDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete user API'
    })
}

module.exports = {
    userGet,
    userPut,
    userDelete
}