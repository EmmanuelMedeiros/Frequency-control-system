import UserController from '../controller/userController'
import jsonAuthentication from '../middleware/jsonAuth'

const router = require('express').Router()

router.put('/delete/:uuid' , jsonAuthentication, UserController.deleteEmployee)
router.get('/jwt/verify'            , jsonAuthentication, UserController.checkJWTToken)
router.post('/register'             , jsonAuthentication, UserController.registerNewUser)
router.get('/uuid/:uuid'            , jsonAuthentication, UserController.getUserByUUID)
router.get('/list'                  , jsonAuthentication, UserController.getListOfUsers)
router.post('/admin/register'       , UserController.registerFirstAdmin)
router.post('/admin/authenticate'   , UserController.authenticateAdmin)

module.exports = router