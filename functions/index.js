import functions from "firebase-functions"
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './router/route.js'

import ENV from "./env.config.js"
import { db_connection } from './database/connection.js'

const app = express()

// middlewares
// express used to increase the limit of the request body
// without error "PayloadTooLargeError: request entity too large" will be recieved
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: false }));

app.use(cors({ origin: `${ENV.ORIGIN}` }));

app.use(morgan('tiny'));
app.disable('x-powered-by');

app.get('/', (req,res) => {
    res.status(201).json("Home GET Request")
})

// api route
app.use('/api', router)

// connect only when their is a mongodb connection
db_connection().then(() => {
    try {
        console.log("Connection Succesful!")

    } catch(error) {
        console.log(error)
    }
}).catch(error => {
    console.log("Invalid database connection!", error)
}) 

export const api = functions.https.onRequest(app)