import HelloWorldController from '../controller/helloWorld'
const router = require('express').Router()

router.get('/', HelloWorldController.helloWord)

module.exports = router