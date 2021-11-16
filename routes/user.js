const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');
const { validateRole, validateEmail } = require('../helpers/validate-database');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router()

router.get('/', userGet)

router.post('/', 
[
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(validateEmail),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must contain at least 8 characters').isLength({min: 8}),
    check('role').custom(validateRole),
    validateFields
],
userPost)

router.put('/', userPut)
router.delete('/', userDelete)

module.exports = router;