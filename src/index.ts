import express, { Request, Response } from 'express'

import compression from 'compression'

import cors from 'cors'

import routes from './routes'

import process from 'process'

import "./setup/mongo"

if (process.env.ENV !== 'production') {
    require('dotenv').config()
}

const checkIfCompressResponse = (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
        return false
    }

    return compression.filter(req, res)
}

const app = express()

app.use(express.json())

app.use(compression({ filter: checkIfCompressResponse, threshold: 0 }))

app.use(cors())

app.use('/api/v1', routes)

const server = app.listen(process.env.PORT)

process.on('SIGINT', () => {
    server.close(() => console.log("Servidor encerrado!"))
})