const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth');
const { validateEmail, validateRole } = require('../helpers/validate-database');
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

router.post('/register', 
[
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(validateEmail),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must contain at least 8 characters').isLength({min: 8}),
    check('role').custom(validateRole),
    validateFields
],
register)

module.exports = router;