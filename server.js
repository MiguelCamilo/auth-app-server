import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

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

app.listen(port, () => {
    console.log(`Server Listening on http://localhost:${port}`)
})