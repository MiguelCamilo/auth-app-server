import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './router/route.js'

import { connect } from './database/connection.js'

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powered-by')

const port = 8080

app.get('/', (req,res) => {
    res.status(201).json("Home GET Request")
})

// api route
app.use('/api', router)

// connect only when their is a mongodb connection
connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server Listening on http://localhost:${port}`)
        })

    } catch(error) {
        console.log(error)
    }
}).catch(error => {
    console.log("Invalid database connection!", error)
}) 

