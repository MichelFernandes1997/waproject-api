import mongoose from 'mongoose'

import process from 'process'

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, LOCAL_MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env

mongoose.connect(
    `mongodb://${LOCAL_MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`
    /*`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?authSource=admin`*/,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

mongoose.connection.on('error', () => console.error('Connection error:'))

mongoose.connection.once('open', () => console.log('Database connected!'))

export default mongoose

// import "reflect-metadata"

// import { createConnection } from "typeorm"

// import { Laboratorio } from '../entity/Laboratorio'

// import { Exame } from "../entity/Exame"

// import process from "process"

// const mongo = async () => {
//     try {
//         const database = await createConnection({
//             type: "mongodb",
//             host: "127.0.0.1",
//             port: 27017,
//             database: "wa-api",
//             entities: [
//                 Laboratorio,
//                 Exame
//             ],
//             synchronize: true,
//             logging: true
//         })

//         console.log('Database connected!')

//         process.on('SIGINT', () => {
//             database.close().then(result => console.log("Conexão com a database encerrada!"))
//         })

//         return database
//     } catch (err) {
//         console.log(err)
//     }
// }

// const connect = { mongo }

// export default connect