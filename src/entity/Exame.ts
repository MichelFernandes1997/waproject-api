import mongoose, { Schema } from 'mongoose'

import IExame from '../interfaces/IExame'

const exameSchema: Schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
        laboratorios: [{ type: Schema.Types.ObjectId, ref: 'Laboratorio' }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<IExame>('Exame', exameSchema)