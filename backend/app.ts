const express = require('express')
const cors = require('cors')

import {Express, json} from 'express'

const helloWorldRouter = require('./routes/helloWorld')
const userRouter = require('./routes/userRoute')
const frequencyRouter = require('./routes/frequencyRoute')

const app:Express = express()

app.use(json({limit: '10mb'}))
app.use(cors())
app.use(express.static('public'))

app.use('/helloWorld', helloWorldRouter)
app.use('/user', userRouter)
app.use('/frequency', frequencyRouter)

app.listen(3000, () => {
    console.log("Server runing in port: 3000")
})