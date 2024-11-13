import UserController from '../controller/userController'
import jsonAuthentication from '../middleware/jsonAuth'

const router = require('express').Router()

router.post('/admin/register', UserController.registerFirstAdmin)
router.post('/admin/authenticate', UserController.authenticateAdmin)
router.post('/register', jsonAuthentication, UserController.registerNewUser)

module.exports = router