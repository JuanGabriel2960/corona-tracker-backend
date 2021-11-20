const { Router } = require('express');
const { userGet, userPut, userDelete } = require('../controllers/user');

const router = Router()

router.get('/', userGet)
router.put('/', userPut)
router.delete('/', userDelete)

module.exports = router;