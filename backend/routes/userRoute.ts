import UserController from '../controller/userController'
import jsonAuthentication from '../middleware/jsonAuth'

const router = require('express').Router()

router.post('/admin/register', UserController.registerFirstAdmin)
router.post('/admin/authenticate', UserController.authenticateAdmin)
router.post('/register', jsonAuthentication, UserController.registerNewUser)
router.get('/uuid/:uuid', jsonAuthentication, UserController.getUserByUUID)
router.get('/list', UserController.getListOfUsers)

module.exports = router