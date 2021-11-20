const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userDelete } = require('../controllers/user');
const { validateID, validateRole } = require('../helpers/validate-database');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router()

router.get('/', userGet)

router.put('/:id', 
[
    check('id', 'The ID is not valid.').isMongoId(),
    check('id').custom(validateID),
    check('role').custom(validateRole),
    validateFields
],
userPut)

router.delete('/', 
[
    validateJWT,
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],
userDelete)

module.exports = router;