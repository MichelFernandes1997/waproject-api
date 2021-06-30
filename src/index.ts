import express, { Request, Response } from 'express'

import compression from 'compression'

import cors from 'cors'

import routes from './routes'

import process from 'process'

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

app.listen(process.env.PORT)