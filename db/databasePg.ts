const { Client } = require('pg')

require('dotenv').config()

const client = new Client(
    {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PWD,
        port: process.env.DATABASE_PORT
    }
)

client.connect()

export default client