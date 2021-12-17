const { request, response } = require('express');
const axios = require("axios").default;

const getCountryInfo = (req = request, res = response) => {
    const { country } = req.params

    const options = {
        method: 'GET',
        url: process.env.COVID_API_URL,
        params: {name: country},
        headers: {
          'x-rapidapi-host': process.env.X_RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.X_RAPIDAPI_KEY
        }
    };

    axios.request(options).then(function (response) {
        if(response.data.length>0){
            res.json(
                response.data[0]
            )
        }else{
            res.status(404).json({
                msg: `Your search (${country}) did not match any country.`
            })
        }
    }).catch(function (error) {
        res.status(403).json(
            error
        )
    });  
}

module.exports = {
    getCountryInfo
}