const express = require('express')
const cors = require('cors')

import {Express} from 'express'

const helloWorldRouter = require('./routes/helloWorld')
const userRouter = require('./routes/userRoute')

const app:Express = express()

app.use(express.json())
app.use(cors())

app.use(express.static('public'))

app.use('/helloWorld', helloWorldRouter)
app.use('/user', userRouter)

app.listen(3000, () => {
    console.log("Server runing in port: 3000")
})