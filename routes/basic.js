const { Router } = require('express');
const { getServices } = require('../controllers/basic');

const router = Router()

router.get('/services', getServices)

module.exports = router;