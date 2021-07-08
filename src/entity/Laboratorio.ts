import mongoose, { Schema } from 'mongoose'

import ILaboratorio from '../interfaces/ILaboratorio'

const laboratorioSchema: Schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        endereco: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
        exames: [{ type: Schema.Types.ObjectId, ref: 'Exame' }]
    },
    {
        timestamps: true
    }
)

export default mongoose.model<ILaboratorio>('Laboratorio', laboratorioSchema)