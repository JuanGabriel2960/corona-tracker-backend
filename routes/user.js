const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userDelete } = require('../controllers/user');
const { validateID, validateRole } = require('../helpers/validate-database');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router()

router.get('/', userGet)

router.put('/:id', [
    check('id', 'The ID is not valid.').isMongoId(),
    check('id').custom(validateID),
    check('role').custom(validateRole),
    validateFields
],
userPut)

router.delete('/', userDelete)

module.exports = router;