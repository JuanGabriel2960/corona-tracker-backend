const { request, response } = require('express');

const getServices = (req = request, res = response) => {
    res.json([
        {
            "title": "Stay informed about COVID",
            "description": "You will be able to see the amount of infected, recovered and dead by COVID of all the countries of the world."
        },
        {
            "title": "Fast and update information",
            "description": "The information is updated every 15 minutes, so you will always be aware of the latest."
        },
        {
            "title": "Locate all the countries",
            "description": "At the time of conducting a search you will be able to see the location of the country you are looking for."
        }
    ])
}

module.exports = {
    getServices
}