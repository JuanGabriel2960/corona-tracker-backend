const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');
const { validateFields } = require('../middlewares/validate-fields');
const Role = require('../models/role')

const router = Router()

router.get('/', userGet)

router.post('/', 
[
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    check('password', 'Password must contain at least 8 characters').isLength({min: 8}),
    check('role').custom( async(role = '') => {
        const roleExist = await Role.findOne({role})
        if(!roleExist){
            throw new Error(`Role ${role} is not valid`)
        }
    }),
    validateFields
],
userPost)

router.put('/', userPut)
router.delete('/', userDelete)

module.exports = router;