import FrequencyController from "../controller/frequencyController"
import jsonAuthentication from "../middleware/jsonAuth"

const router = require('express').Router()

router.post('/set/:uuid'    , jsonAuthentication, FrequencyController.setFrequency)
router.get('/last_hit/:uuid', jsonAuthentication, FrequencyController.searchForLastFrequencyHit)

module.exports = router