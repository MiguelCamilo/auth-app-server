import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import router from './router/route.js'

import { connect } from './database/connection.js'

const app = express()

// middlewares
// express used to increase the limit of the request body
// without error "PayloadTooLargeError: request entity too large" will be recieved
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: false }));
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');


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

