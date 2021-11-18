const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router()

router.post('/login',
[
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],
login)

router.post('/register', register)

module.exports = router;