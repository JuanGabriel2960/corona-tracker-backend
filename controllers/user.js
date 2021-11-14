const { request, response } = require('express');

const userGet = (req = request, res = response) => {
    res.json({
        msg: 'get API'
    })
}
const userPost = (req = request, res = response) => {
    res.json({
        msg: 'post API'
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