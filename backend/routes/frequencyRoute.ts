import FrequencyController from "../controller/frequencyController"
import jsonAuthentication from "../middleware/jsonAuth"

const router = require('express').Router()

router.get('/set/:uuid', jsonAuthentication ,FrequencyController.setFrequency)

module.exports = router