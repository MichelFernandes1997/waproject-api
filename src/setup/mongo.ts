import mongoose from 'mongoose'

import process from 'process'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, LOCAL_MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env

mongoose.connect(
    `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`
    /*`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?authSource=admin`*/,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

mongoose.connection.on('error', () => console.error('Connection error:', `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`))

mongoose.connection.once('open', () => console.log('Database connected!'))

export default mongoose