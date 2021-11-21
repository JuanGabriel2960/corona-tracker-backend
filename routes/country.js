const { Router } = require('express');
const { getCountryInfo } = require('../controllers/country');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router()

router.get('/:country', 
[
    validateJWT
],
getCountryInfo)

module.exports = router;